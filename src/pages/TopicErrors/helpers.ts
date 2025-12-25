import { getQuestionsByGroupIds } from '../../helpers'
import { Question, QuestionId } from '../../types'
import { StatisticsStore } from '../../services/StatisticsStore'
import { Language } from '../../enums'

export const getQuestionsWithErrors = (
  allQuestions: Question[],
  firebaseGroupQuestionsIds: string[]
): Question[] => {
  const questionIds: QuestionId[] = firebaseGroupQuestionsIds.map((q) => Number(q))

  const groupQuestions = getQuestionsByGroupIds(allQuestions, questionIds)
  const statistic = StatisticsStore.getQuestionsStatisticsByQuestionsIds(questionIds, Language.Russian)

  // StatisticsStore.isCorrectQuestionAnswersMoreThanWrong()
  // get correct questions
  const questionsWithErrors = groupQuestions.filter((question) => {
    const questionStatistic = statistic?.[question.id]

    if (!questionStatistic) {
      return false
    }

    return StatisticsStore.isWrongQuestionAnswersMoreThanCorrect(questionStatistic)
  })

  return questionsWithErrors
}
