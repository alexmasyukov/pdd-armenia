const fs = require('fs');
const path = require('path');

const CSV_DIR = path.join(__dirname, '../4__source_csv_from_screenshots_by_ai_25_12_2025');
const OUTPUT_DIR = path.join(__dirname, '../5__source_json_from_all_csv_files_ai_25_12_2025');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'ru_2026.json');

function readFileWithEncoding(filePath) {
  const buffer = fs.readFileSync(filePath);

  // Проверяем BOM для определения кодировки
  if (buffer[0] === 0xFF && buffer[1] === 0xFE) {
    // UTF-16 LE
    return buffer.toString('utf16le').slice(1); // убираем BOM
  } else if (buffer[0] === 0xFE && buffer[1] === 0xFF) {
    // UTF-16 BE
    const swapped = Buffer.alloc(buffer.length);
    for (let i = 0; i < buffer.length; i += 2) {
      swapped[i] = buffer[i + 1];
      swapped[i + 1] = buffer[i];
    }
    return swapped.toString('utf16le').slice(1);
  } else {
    // UTF-8
    return buffer.toString('utf-8');
  }
}

function parseCSV(content) {
  const lines = content.trim().split('\n');
  const questions = [];

  // Обрабатываем все строки (заголовка нет)
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const parts = line.split('|');

    // Пропускаем строку заголовка если она есть
    if (parts[0] === '№' || parts[1] === 'Вопрос') continue;

    // Минимум: №, вопрос, хотя бы 2 ответа, правильный ответ = 5 колонок
    if (parts.length < 5) continue;

    const num = parts[0];
    const question = parts[1];
    const correctAnswer = parts[parts.length - 1]; // Последний элемент - правильный ответ

    // Варианты ответов - всё между вопросом и правильным ответом
    const a1 = parts[2] || '';
    const a2 = parts[3] || '';
    const a3 = parts[4] || '';
    const a4 = parts[5] || '';
    const a5 = parts.length >= 8 ? parts[6] : ''; // Вариант 5 только если 8+ колонок

    if (!question || !correctAnswer) continue;

    questions.push({
      num: parseInt(num, 10),
      q: question.trim(),
      a1: a1?.trim() || '',
      a2: a2?.trim() || '',
      a3: a3?.trim() || '',
      a4: a4?.trim() || '',
      a5: a5?.trim() || '',
      correct: parseInt(correctAnswer, 10)
    });
  }

  return questions;
}

function main() {
  // Создаём выходную директорию если её нет
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Получаем список CSV файлов и сортируем по номеру
  const files = fs.readdirSync(CSV_DIR)
    .filter(f => f.endsWith('.csv'))
    .sort((a, b) => {
      const numA = parseInt(a.replace('.csv', ''), 10);
      const numB = parseInt(b.replace('.csv', ''), 10);
      return numA - numB;
    });

  console.log('Найдено CSV файлов:', files.length);

  const allQuestions = [];
  let globalId = 1;

  for (const file of files) {
    const gid = file.replace('.csv', '');
    const filePath = path.join(CSV_DIR, file);
    const content = readFileWithEncoding(filePath);
    const questions = parseCSV(content);

    console.log(`Файл ${file}: ${questions.length} вопросов`);

    for (const q of questions) {
      allQuestions.push({
        id: globalId++,
        gid: gid,
        tid: "0",
        q: q.q,
        a1: q.a1,
        a2: q.a2,
        a3: q.a3,
        a4: q.a4,
        a5: q.a5,
        a6: "",
        correct: `a${q.correct}`,
        img: ""
      });
    }
  }

  console.log(`\nВсего вопросов: ${allQuestions.length}`);

  // Записываем JSON файл
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allQuestions, null, 2), 'utf-8');
  console.log(`JSON сохранён: ${OUTPUT_FILE}`);
}

main();
