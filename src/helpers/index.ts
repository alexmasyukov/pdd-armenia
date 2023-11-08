import { StatisticsStore } from '../services/StatisticsStore';
import { BaseData, Group, QuestionsStatistics } from './../types';

export const getEmptyBaseData = (): BaseData => ({
  groups: [],
  questions: [],
});

export const isObject = (value: unknown) => {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
};

export const getStatisticsByGroup = (
  groupId: Group['id'],
  questionsStatistics: QuestionsStatistics,
  data: BaseData
) => {
  const questionIds = data.questions.filter(({ gid }) => gid === groupId).map(({ id }) => id);

  const result = questionIds.reduce(
    (acc, id) => {
      const questionStatistics = questionsStatistics[id];

      if (!Array.isArray(questionStatistics)) {
        return acc;
      }

      if (StatisticsStore.isCorrectQuestionAnswersMoreThanWrong(questionStatistics)) {
        acc.correct += 1;
      } else {
        acc.wrong += 1;
      }

      return acc;
    },
    {
      correct: 0,
      wrong: 0,
    }
  );

  return {
    ...result,
    questionsCount: questionIds.length,
  };
};
