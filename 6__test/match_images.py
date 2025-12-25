#!/usr/bin/env python3
"""
Скрипт для сопоставления извлечённых картинок с вопросами в CSV.
Использует OpenCV template matching для поиска картинок на скриншотах страниц PDF.
"""

import cv2
import numpy as np
import os
import csv
from pathlib import Path

# Конфигурация
BASE_DIR = Path("/Users/aleksexmasukov-work/atl/atl-questions/6__test")
EXTRACTED_IMAGES_DIR = BASE_DIR / "extracted_images_from_1_pdf"
SCREENSHOTS_DIR = BASE_DIR / "screenshots_by_pages_from_1_pdf"
CSV_FILE = BASE_DIR / "1.csv"
OUTPUT_CSV = BASE_DIR / "1_with_images.csv"
OUTPUT_IMAGES_DIR = BASE_DIR / "matched_images"

# Создаём папку для выходных картинок
OUTPUT_IMAGES_DIR.mkdir(exist_ok=True)

# Количество вопросов на странице (по 6 на страницу, 2 колонки по 3)
QUESTIONS_PER_PAGE = 6


def load_image(path):
    """Загружает изображение для OpenCV"""
    img = cv2.imread(str(path))
    if img is None:
        raise ValueError(f"Cannot load image: {path}")
    return img


def find_template_on_page(template_path, page_path, threshold=0.7):
    """
    Ищет шаблон (извлечённую картинку) на скриншоте страницы.
    Возвращает (найдено, x, y, ширина, высота, уверенность)
    """
    template = load_image(template_path)
    page = load_image(page_path)

    # Конвертируем в grayscale
    template_gray = cv2.cvtColor(template, cv2.COLOR_BGR2GRAY)
    page_gray = cv2.cvtColor(page, cv2.COLOR_BGR2GRAY)

    h, w = template_gray.shape
    page_h, page_w = page_gray.shape

    # Пропускаем если шаблон больше страницы
    if h > page_h or w > page_w:
        return False, 0, 0, 0, 0, 0

    # Template matching с разными масштабами
    best_match = None
    best_val = 0

    for scale in [0.8, 0.9, 1.0, 1.1, 1.2]:
        scaled_w = int(w * scale)
        scaled_h = int(h * scale)

        if scaled_h > page_h or scaled_w > page_w or scaled_h < 10 or scaled_w < 10:
            continue

        scaled_template = cv2.resize(template_gray, (scaled_w, scaled_h))

        result = cv2.matchTemplate(page_gray, scaled_template, cv2.TM_CCOEFF_NORMED)
        _, max_val, _, max_loc = cv2.minMaxLoc(result)

        if max_val > best_val:
            best_val = max_val
            best_match = (max_loc[0], max_loc[1], scaled_w, scaled_h)

    if best_val >= threshold and best_match:
        x, y, w, h = best_match
        return True, x, y, w, h, best_val

    return False, 0, 0, 0, 0, 0


def get_question_number_from_position(page_num, y_pos, page_height, x_pos, page_width):
    """
    Определяет номер вопроса по позиции на странице.

    Страница разделена на:
    - 2 колонки (левая и правая)
    - 3 строки в каждой колонке

    Нумерация на странице:
    1 | 2
    3 | 4
    5 | 6
    """
    # Определяем колонку (0 = левая, 1 = правая)
    col = 0 if x_pos < page_width / 2 else 1

    # Определяем строку (0, 1, 2)
    row = min(2, int(y_pos / (page_height / 3)))

    # Позиция внутри страницы (0-5)
    position_on_page = row * 2 + col

    # Номер вопроса (1-based)
    question_num = (page_num - 1) * QUESTIONS_PER_PAGE + position_on_page + 1

    return question_num


def main():
    print("=" * 60)
    print("Сопоставление картинок с вопросами")
    print("=" * 60)

    # Получаем список страниц
    page_files = sorted(SCREENSHOTS_DIR.glob("*.jpg"))
    print(f"Найдено страниц: {len(page_files)}")

    # Получаем список извлечённых картинок
    extracted_files = sorted(
        EXTRACTED_IMAGES_DIR.glob("*.jpg"),
        key=lambda x: int(x.stem) if x.stem.isdigit() else 0
    )
    print(f"Найдено извлечённых картинок: {len(extracted_files)}")

    # Загружаем размеры первой страницы для референса
    first_page = load_image(page_files[0])
    page_height, page_width = first_page.shape[:2]
    print(f"Размер страницы: {page_width}x{page_height}")

    # Словарь для хранения соответствий: image_index -> question_number
    matches = {}

    # Для каждой извлечённой картинки ищем её на страницах
    for img_idx, img_path in enumerate(extracted_files):
        print(f"\n[{img_idx + 1}/{len(extracted_files)}] Обрабатываем: {img_path.name}")

        found = False
        for page_path in page_files:
            # Извлекаем номер страницы из имени файла
            page_name = page_path.stem  # e.g., "1_page-0001"
            page_num = int(page_name.split("-")[-1])  # e.g., 1

            is_found, x, y, w, h, confidence = find_template_on_page(
                img_path, page_path, threshold=0.6
            )

            if is_found:
                question_num = get_question_number_from_position(
                    page_num, y, page_height, x, page_width
                )

                print(f"  ✓ Найдено на странице {page_num} (x={x}, y={y})")
                print(f"    Вопрос #{question_num}, уверенность: {confidence:.2f}")

                matches[int(img_path.stem)] = question_num

                # Копируем картинку с новым именем
                new_name = f"q{question_num}.jpg"
                output_path = OUTPUT_IMAGES_DIR / new_name
                cv2.imwrite(str(output_path), load_image(img_path))
                print(f"    Сохранено как: {new_name}")

                found = True
                break

        if not found:
            print(f"  ✗ Не найдено на страницах")

    print("\n" + "=" * 60)
    print(f"Найдено соответствий: {len(matches)}")
    print("=" * 60)

    # Обновляем CSV
    print("\nОбновляем CSV...")

    # Читаем существующий CSV
    with open(CSV_FILE, 'r', encoding='utf-8') as f:
        reader = csv.reader(f, delimiter='|')
        rows = list(reader)

    # Добавляем колонку для изображения если её нет
    header = rows[0]
    if 'Изображение' not in header:
        header.append('Изображение')

    # Обновляем строки с путями к изображениям
    for i, row in enumerate(rows[1:], start=1):
        question_num = int(row[0]) if row[0].isdigit() else i

        # Проверяем есть ли картинка для этого вопроса
        img_path = OUTPUT_IMAGES_DIR / f"q{question_num}.jpg"
        if img_path.exists():
            # Добавляем путь к изображению
            if len(row) <= len(header) - 1:
                row.append(f"q{question_num}.jpg")
            else:
                row[-1] = f"q{question_num}.jpg"
        else:
            if len(row) <= len(header) - 1:
                row.append("")

    # Записываем обновлённый CSV
    with open(OUTPUT_CSV, 'w', encoding='utf-8', newline='') as f:
        writer = csv.writer(f, delimiter='|')
        writer.writerows(rows)

    print(f"Сохранено: {OUTPUT_CSV}")

    # Выводим статистику по несопоставленным картинкам
    all_image_indices = set(int(p.stem) for p in extracted_files if p.stem.isdigit())
    matched_indices = set(matches.keys())
    unmatched = all_image_indices - matched_indices

    if unmatched:
        print(f"\nНесопоставленные картинки ({len(unmatched)}):")
        for idx in sorted(unmatched)[:10]:
            print(f"  - {idx}.jpg")
        if len(unmatched) > 10:
            print(f"  ... и ещё {len(unmatched) - 10}")

    print("\nГотово!")


if __name__ == "__main__":
    main()
