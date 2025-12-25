import { FavoriteStore } from '../services/FavoriteStore'
import { StatisticsStore } from '../services/StatisticsStore'
import { BaseData, Group, Question, QuestionId, QuestionsStatistics } from '../types'

export const getEmptyBaseData = (): BaseData => ({
  groups: [],
  questions: [],
})

export const isObject = (value: unknown) => {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export const getStatisticsByGroup = (
  groupId: Group['id'],
  questionsStatistics: QuestionsStatistics,
  data: BaseData
) => {
  const questionIds = data.questions.filter(({ gid }) => gid === groupId).map(({ id }) => id)

  const result = questionIds.reduce(
    (acc, id) => {
      const questionStatistics = questionsStatistics[id]

      if (FavoriteStore.hasQuestionIdInFavorites(id)) {
        acc.inFavorite += 1
      }

      if (!Array.isArray(questionStatistics)) {
        return acc
      }

      if (StatisticsStore.isCorrectQuestionAnswersMoreOrEqualThanWrong(questionStatistics)) {
        acc.correct += 1
      } else {
        acc.wrong += 1
      }

      return acc
    },
    {
      inFavorite: 0,
      correct: 0,
      wrong: 0,
    }
  )

  return {
    ...result,
    questionsCount: questionIds.length,
  }
}

export const getStatisticByFirebaseGroup = ({
  firebaseGroupQuestionIds,
  allQuestionsStatistic,
}: {
  firebaseGroupQuestionIds: QuestionId[]
  allQuestionsStatistic: QuestionsStatistics
}) => {
  const result = firebaseGroupQuestionIds.reduce(
    (acc, id) => {
      const questionStatistic = allQuestionsStatistic[id]

      if (FavoriteStore.hasQuestionIdInFavorites(id)) {
        acc.inFavorite += 1
      }

      if (!Array.isArray(questionStatistic)) {
        return acc
      }

      if (StatisticsStore.isCorrectQuestionAnswersMoreOrEqualThanWrong(questionStatistic)) {
        acc.correct += 1
      } else {
        acc.wrong += 1
      }

      return acc
    },
    {
      inFavorite: 0,
      correct: 0,
      wrong: 0,
    }
  )

  return {
    ...result,
    questionsCount: firebaseGroupQuestionIds.length,
  }
}

export const getQuestionsByGroupIdsAndFavoriteIds = (
  questions: Question[],
  groupIds: QuestionId[],
  favoriteIds: QuestionId[]
) => {
  const set2 = new Set(groupIds)
  const set1 = new Set(favoriteIds)

  return questions.filter((item) => set1.has(item.id) && set2.has(item.id))
}

export const getQuestionsByGroupIds = (questions: Question[], groupIds: QuestionId[]) => {
  const set2 = new Set(groupIds)

  return questions.filter((item) => set2.has(item.id))
}
