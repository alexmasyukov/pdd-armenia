import { Question } from '../../types'

const QUESTIONS_PER_GROUP = 2

export const getExamQuestions = (questions: Question[]): Question[] => {
  const grouped: Record<string, Question[]> = {}

  for (const q of questions) {
    if (!grouped[q.gid]) grouped[q.gid] = []
    grouped[q.gid].push(q)
  }

  const selected: Question[] = []

  Object.values(grouped).forEach((groupQuestions) => {
    const shuffled = [...groupQuestions].sort(() => Math.random() - 0.5)
    selected.push(...shuffled.slice(0, QUESTIONS_PER_GROUP))
  })

  // Fisher-Yates shuffle
  for (let i = selected.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[selected[i], selected[j]] = [selected[j], selected[i]]
  }

  return selected
}
