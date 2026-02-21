import json
import re

def normalize(text: str) -> str:
    """Remove everything except Russian, English letters and digits, then lowercase."""
    if not text:
        return ""
    return re.sub(r'[^a-zA-Zа-яА-ЯёЁ0-9]', '', text).lower()

def make_key(q: dict) -> str:
    """Build a comparison key from q, a1..a6 fields."""
    parts = [normalize(q.get('q', ''))]
    for i in range(1, 7):
        parts.append(normalize(q.get(f'a{i}', '')))
    return '|'.join(parts)

def main():
    with open('src/data/ru.json', 'r', encoding='utf-8') as f:
        old_data = json.load(f)
    old_questions = old_data['questions']

    with open('src/data/ru_2026.json', 'r', encoding='utf-8') as f:
        new_questions = json.load(f)

    # Build lookup: normalized key -> old question
    old_lookup: dict[str, dict] = {}
    for q in old_questions:
        key = make_key(q)
        old_lookup[key] = q

    matched = 0
    for q in new_questions:
        key = make_key(q)
        if key in old_lookup:
            old_q = old_lookup[key]
            q['oldId'] = old_q['id']
            if old_q.get('img'):
                q['img'] = old_q['img']
            if old_q.get('tid'):
                q['tid'] = old_q['tid']
            matched += 1

    with open('src/data/ru_2026.json', 'w', encoding='utf-8') as f:
        json.dump(new_questions, f, ensure_ascii=False, indent=2)

    print(f"Total new questions: {len(new_questions)}")
    print(f"Total old questions: {len(old_questions)}")
    print(f"Matched: {matched}")
    print(f"Not matched: {len(new_questions) - matched}")

if __name__ == '__main__':
    main()
