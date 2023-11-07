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
}

const Question: React.FC<Props> = ({
  onAnswer,
  enabled,
  answerFromHistory,
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

  return (
    <div className='question'>
      {img && <img src={`${process.env.PUBLIC_URL}/images/questions/${gid}/${img}.jpg`} alt='' />}
      {!img && (
        <div className={s.withoutImg}>
          {t('questionWithoutImg')}
          <div />
        </div>
      )}

      <p>{q}</p>

      <ul className='answers'>
        {a1 && (
          <Answer
            onClick={handleAnswerClick('a1')}
            text={a1}
            isCorrect={!!answered && correct === 'a1'}
            isWrong={answered === 'a1' && correct !== 'a1'}
          />
        )}
        {a2 && (
          <Answer
            onClick={handleAnswerClick('a2')}
            text={a2}
            isCorrect={!!answered && correct === 'a2'}
            isWrong={answered === 'a2' && correct !== 'a2'}
          />
        )}
        {a3 && (
          <Answer
            onClick={handleAnswerClick('a3')}
            text={a3}
            isCorrect={!!answered && correct === 'a3'}
            isWrong={answered === 'a3' && correct !== 'a3'}
          />
        )}
        {a4 && (
          <Answer
            onClick={handleAnswerClick('a4')}
            text={a4}
            isCorrect={!!answered && correct === 'a4'}
            isWrong={answered === 'a4' && correct !== 'a4'}
          />
        )}
        {a5 && (
          <Answer
            onClick={handleAnswerClick('a5')}
            text={a5}
            isCorrect={!!answered && correct === 'a5'}
            isWrong={answered === 'a5' && correct !== 'a5'}
          />
        )}
        {a6 && (
          <Answer
            onClick={handleAnswerClick('a6')}
            text={a6}
            isCorrect={!!answered && correct === 'a6'}
            isWrong={answered === 'a6' && correct !== 'a6'}
          />
        )}
      </ul>
    </div>
  );
};

export default Question;
