import React from 'react';
import { useTranslation } from 'react-i18next';
import Answer from './Answer';
import { AnswerEvent, Question as QuestionType, AnswerKey } from '../../types';
import s from './Question.module.scss';

interface Props {
  item: QuestionType;
  enabled: boolean;
  answerFromHistory: AnswerKey;
  onAnswer: (event: AnswerEvent) => void;
  showRightAnswer?: boolean;
}

const Question: React.FC<Props> = ({
  onAnswer,
  enabled,
  answerFromHistory,
  showRightAnswer,
  item: { q, a1, a2, a3, a4, a5, a6, correct, img, gid },
}) => {
  const { t } = useTranslation();
  const answered = answerFromHistory;

  const handleAnswerClick = (answerKey: AnswerKey) => () => {
    if (enabled) {
      onAnswer({
        answer: answerKey,
        answerIsCorrect: correct === answerKey,
      });
    }
  };

  const answers = [
    { key: 'a1', value: a1 },
    { key: 'a2', value: a2 },
    { key: 'a3', value: a3 },
    { key: 'a4', value: a4 },
    { key: 'a5', value: a5 },
    { key: 'a6', value: a6 },
  ];

  return (
    <div className={s.question}>
      {img && <img src={`${process.env.PUBLIC_URL}/images/questions/${gid}/${img}.jpg`} alt='' />}
      {!img && (
        <div className={s.withoutImg}>
          {t('questionWithoutImg')}
          <div />
        </div>
      )}

      <p>{q}</p>

      <ul className={s.answers}>
        {answers
          .filter((answer) => !!answer.value && answer.value !== undefined)
          .map((answer) => (
            <Answer
              key={answer.key}
              onClick={handleAnswerClick(answer.key)}
              text={answer.value!}
              answered={!!answered}
              isCorrect={correct === answer.key}
              isWrong={answered === answer.key && correct !== answer.key}
              showRightAnswer={showRightAnswer}
            />
          ))}
      </ul>
    </div>
  );
};

export default Question;
