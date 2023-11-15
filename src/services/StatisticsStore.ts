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

  static getLocalStorage = (): QuestionsStatisticsByLanguage => {
    let result = {} as QuestionsStatisticsByLanguage;

    try {
      const questionsStatisticsByLanguage = localStorage as QuestionsStatisticsByLanguage | null;

      if (!isObject(questionsStatisticsByLanguage)) {
        throw new Error('questionsStatisticsByLanguage is not an object');
      }

      result = questionsStatisticsByLanguage as QuestionsStatisticsByLanguage;
    } catch (error) {
      console.warn('getLocalStorage error: ', error);
    }

    return result;
  };

  static getAllQuestionsKeys = (
    lang: Language,
    questionsStatisticsByLanguage: QuestionsStatisticsByLanguage
  ): LocalStorageQuestionKey[] => {
    let questionKeys: LocalStorageQuestionKey[] = [];

    try {
      // get only questions keys from questionsStatisticsByLanguage
      questionKeys = Object.keys(questionsStatisticsByLanguage!).filter((key) =>
        key.startsWith(StatisticsStore.getLocalstorageQuestionKeyWithoutQuestionId(lang))
      ) as LocalStorageQuestionKey[];
    } catch (error) {
      console.warn('getAllQuestionsKeys error: ', error);
    }

    return questionKeys;
  };

  static getAllQuestionsStatistics = (lang: Language) => {
    let statistics: QuestionsStatistics = {};

    try {
      const questionsStatisticsByLanguage = StatisticsStore.getLocalStorage();
      const questionKeys = StatisticsStore.getAllQuestionsKeys(lang, questionsStatisticsByLanguage);

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

  static cleanAllStatistics = (lang: Language): void => {
    try {
      const keys = StatisticsStore.getAllQuestionsKeys(lang, StatisticsStore.getLocalStorage());

      keys.forEach((key) => {
        localStorage.removeItem(key);
      });
    } catch (error) {
      console.warn('cleanAllStatistics error:', error);
    }
  };

  static isCorrectQuestionAnswersMoreThanWrong = (questionStatistics: QuestionStatistics): boolean => {
    return questionStatistics[0] > questionStatistics[1];
  };
}
