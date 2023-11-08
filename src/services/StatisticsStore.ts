import { Language } from '../enums';
import { isObject } from '../helpers';
import {
  LocalStorageQuestionKey,
  LocalStorageQuestionKeyWithoutQestionId,
  QuestionId,
  QuestionsStatistics,
  QuestionsStatisticsByLanguage,
  QuestionStatistics,
} from '../types';

export class StatisticsStore {
  private static initialQuestionStatistics: QuestionStatistics = [0, 0];

  static getLocalstorageQuestionKeyWithoutQuestionId = (
    lang: Language
  ): LocalStorageQuestionKeyWithoutQestionId => {
    return `q-${lang}`;
  };

  static getLocalstorageQuesitonKey = (questionId: QuestionId, lang: Language): LocalStorageQuestionKey => {
    return `q-${lang}-${questionId}`;
  };

  static getQuestionStatistics = (questionId: QuestionId, lang: Language): QuestionStatistics => {
    const key = StatisticsStore.getLocalstorageQuesitonKey(questionId, lang);
    let questionStatistics: QuestionStatistics = [...StatisticsStore.initialQuestionStatistics];

    try {
      const questionStatisticsFromStorage = JSON.parse(
        localStorage.getItem(key)!
      ) as QuestionStatistics | null;

      if (Array.isArray(questionStatisticsFromStorage)) {
        questionStatistics = questionStatisticsFromStorage;
      }
    } catch (error) {
      console.warn('getQuestionStatistics error:', error);
    }

    return questionStatistics;
  };

  static setQuestionStatistics = (questionId: QuestionId, lang: Language, answerIsCorrect: boolean): void => {
    const questionStatistics = StatisticsStore.getQuestionStatistics(questionId, lang);

    if (answerIsCorrect) {
      // correct answer +1
      questionStatistics[0] += 1;
    } else {
      // wrong answer +1
      questionStatistics[1] += 1;
    }

    try {
      const key = StatisticsStore.getLocalstorageQuesitonKey(questionId, lang);
      localStorage.setItem(key, JSON.stringify(questionStatistics));
    } catch (error) {
      console.warn('setQuestionStatistics error:', error);
    }
  };

  static getAllQuestionsStatistics = (lang: Language) => {
    let statistics: QuestionsStatistics = {};

    try {
      const questionsStatisticsByLanguage = localStorage as QuestionsStatisticsByLanguage | null;

      if (!isObject(questionsStatisticsByLanguage)) {
        throw new Error('questionsStatisticsByLanguage is not an object');
      }

      // get only questions keys from questionsStatisticsByLanguage
      const questionKeys = Object.keys(questionsStatisticsByLanguage!).filter((key) =>
        key.startsWith(StatisticsStore.getLocalstorageQuestionKeyWithoutQuestionId(lang))
      ) as LocalStorageQuestionKey[];

      // get parsed values from questionsStatisticsByLanguage
      statistics = questionKeys.reduce((acc, key) => {
        const value = questionsStatisticsByLanguage![key] as unknown as string;
        // get questionId from localStorage key
        const questionId = Number(key.split('-').pop()) as QuestionId;

        return {
          ...acc,
          [questionId]: JSON.parse(value),
        };
      }, {} as QuestionsStatistics);
    } catch (error) {
      console.warn('getAnsweredQuestionsCount error: ', error);
    }

    return statistics;
  };

  static isCorrectQuestionAnswersMoreThanWrong = (questionStatistics: QuestionStatistics): boolean => {
    return questionStatistics[0] > questionStatistics[1];
  };
}
