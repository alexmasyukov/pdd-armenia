import { Language } from './enums';

export type AnswerKey = string;

export type QuestionId = number;

export type QuestionIndex = number;

export type Question = {
  id: QuestionId;
  gid: string;
  tid: string;
  q: string;
  a1: AnswerKey;
  a2?: AnswerKey;
  a3?: AnswerKey;
  a4?: AnswerKey;
  a5?: AnswerKey;
  a6?: AnswerKey;
  correct: AnswerKey;
  img: string;
};

export type Group = {
  id: string;
  name: string;
};

export type BaseData = {
  groups: Group[];
  questions: Question[];
};

export type AnswerEvent = {
  answer: AnswerKey;
  answerIsCorrect: boolean;
};

export type AnswerHistory = {
  questionIndex: number;
  status: QuestionStatus;
  answer: AnswerKey;
}[];

export type Favorites = QuestionId[];

type CorrectAnswerCount = number;
type WrongAnswerCount = number;

export type LocalStorageQuestionKeyWithoutQestionId = `q-${Language}`;
export type LocalStorageQuestionKey = `${LocalStorageQuestionKeyWithoutQestionId}-${Question['id']}`;

export type QuestionStatistics = [CorrectAnswerCount, WrongAnswerCount];

export type QuestionsStatistics = Record<QuestionId, QuestionStatistics>;

export type QuestionsStatisticsByLanguage = Record<LocalStorageQuestionKey, QuestionStatistics>;
