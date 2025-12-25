import { Question } from '../../types'
import { StatisticsStore } from '../../services/StatisticsStore'
import { Language } from '../../enums'

export const getQuestionsHasErrors = (allQuestions: Question[]): Question[] => {
  const statistic = StatisticsStore.getAllQuestionsStatistics(Language.Russian)

  return allQuestions.filter((question) => {
    const questionStatistic = statistic?.[question.id]

    if (!questionStatistic) {
      return false
    }

    return StatisticsStore.isQuestionHasErrors(questionStatistic)
  })
}
