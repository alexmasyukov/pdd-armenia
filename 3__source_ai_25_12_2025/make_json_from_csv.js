const fs = require('fs');
const path = require('path');

const CSV_DIR = path.join(__dirname, '../4__source_csv_from_screenshots_by_ai_25_12_2025');
const OUTPUT_DIR = path.join(__dirname, '../5__source_json_from_all_csv_files_ai_25_12_2025');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'ru_2026.json');

// Получаем список CSV файлов и сортируем по номеру
const csvFiles = fs.readdirSync(CSV_DIR)
  .filter(file => file.endsWith('.csv'))
  .sort((a, b) => {
    const numA = parseInt(a.replace('.csv', ''), 10);
    const numB = parseInt(b.replace('.csv', ''), 10);
    return numA - numB;
  });

console.log('Найдены CSV файлы:', csvFiles);

const questions = [];
let globalId = 1;

for (const csvFile of csvFiles) {
  const gid = csvFile.replace('.csv', ''); // номер из названия файла
  const filePath = path.join(CSV_DIR, csvFile);
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n').filter(line => line.trim() !== '');

  // Пропускаем первую строку (заголовок)
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const parts = line.split('|');

    // parts[0] = № (не используем)
    // parts[1] = Вопрос
    // parts[2] = Вариант 1
    // parts[3] = Вариант 2
    // parts[4] = Вариант 3
    // parts[5] = Вариант 4
    // parts[6] = Вариант 5
    // parts[7] = Правильный вариант ответа (или последний элемент если меньше 8 полей)

    if (parts.length < 4) {
      console.warn(`Пропуск строки в файле ${csvFile}: недостаточно полей`, line);
      continue;
    }

    // Правильный ответ всегда в последнем столбце
    const correctAnswer = parseInt(parts[parts.length - 1].trim(), 10);
    if (isNaN(correctAnswer) || correctAnswer < 1 || correctAnswer > 6) {
      console.warn(`Пропуск строки в файле ${csvFile}: некорректный номер правильного ответа "${parts[parts.length - 1]}"`, line);
      continue;
    }

    // Варианты ответа находятся между вопросом (индекс 1) и правильным ответом (последний)
    // Индексы 2 до length-2 включительно
    const answers = [];
    for (let j = 2; j < parts.length - 1; j++) {
      answers.push(parts[j] ? parts[j].trim() : "");
    }

    const question = {
      id: globalId,
      gid: gid,
      tid: "0",
      q: parts[1] ? parts[1].trim() : "",
      a1: answers[0] || "",
      a2: answers[1] || "",
      a3: answers[2] || "",
      a4: answers[3] || "",
      a5: answers[4] || "",
      a6: "",
      correct: `a${correctAnswer}`,
      img: ""
    };

    questions.push(question);
    globalId++;
  }

  console.log(`Обработан файл ${csvFile}: добавлено вопросов до id=${globalId - 1}`);
}

// Создаем выходную директорию если не существует
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Записываем JSON
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(questions, null, 2), 'utf-8');

console.log(`\nГотово! Всего вопросов: ${questions.length}`);
console.log(`Результат сохранен в: ${OUTPUT_FILE}`);
