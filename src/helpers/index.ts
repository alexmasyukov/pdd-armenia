import { BaseData, Question, QuestionStatisticsByLanguage } from './../types';

export const getEmptyBaseData = (): BaseData => ({
  groups: [],
  questions: [],
});

export const isObject = (value: unknown) => {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
};

// TODO: set it to Questions component and other
export const getQuestionStatisticsFromStorage = (lang: string) => {
  const key = `questionStatistics-${lang}`;
  let questionStatistics: QuestionStatisticsByLanguage = {};

  try {
    const questionStatisticsByLanguage = JSON.parse(
      localStorage.getItem(key)!
    ) as QuestionStatisticsByLanguage | null;

    if (isObject(questionStatisticsByLanguage)) {
      questionStatistics = questionStatisticsByLanguage!;
    }
  } catch (error) {
    console.warn('getQuestionsFromStorage error: ', error);
  }

  return questionStatistics;
};

export const getQuestionCountFromStorage = (lang: string) => {
  const key = `questionStatistics-${lang}`;
  let count = 0;

  try {
    const questionStatisticsByLanguage = JSON.parse(
      localStorage.getItem(key)!
    ) as QuestionStatisticsByLanguage | null;

    if (isObject(questionStatisticsByLanguage)) {
      count = Object.keys(questionStatisticsByLanguage!).length;
    } else {
      throw new Error('questionStatisticsByLanguage is not an object');
    }
  } catch (error) {
    console.warn('getQuestionCountFromStorage error: ', error);
  }

  return count;
};
