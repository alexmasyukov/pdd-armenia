import React from 'react';
import { AnswerEvent, Question as QuestionType, AnswerKey } from '../../types';
import Answer from './Answer';

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
  item: { q, a1, a2, a3, a4, a5, a6, currect, img },
}) => {
  const answered = answerFromHistory;

  const handleAnswerClick = (answerKey: AnswerKey) => () => {
    if (enabled) {
      onAnswer({
        answer: answerKey,
        answerIsCurrect: currect === answerKey,
      });
    }
  };

  return (
    <div className='question'>
      <img src={`${process.env.PUBLIC_URL}/images/questions/${img}.jpg`} alt='' />

      <h3>{q}</h3>

      <ul className='answers'>
        {a1 && (
          <Answer
            onClick={handleAnswerClick('a1')}
            text={a1}
            isCurrect={!!answered && currect === 'a1'}
            isWrong={answered === 'a1' && currect !== 'a1'}
          />
        )}
        {a2 && (
          <Answer
            onClick={handleAnswerClick('a2')}
            text={a2}
            isCurrect={!!answered && currect === 'a2'}
            isWrong={answered === 'a2' && currect !== 'a2'}
          />
        )}
        {a3 && (
          <Answer
            onClick={handleAnswerClick('a3')}
            text={a3}
            isCurrect={!!answered && currect === 'a3'}
            isWrong={answered === 'a3' && currect !== 'a3'}
          />
        )}
        {a4 && (
          <Answer
            onClick={handleAnswerClick('a4')}
            text={a4}
            isCurrect={!!answered && currect === 'a4'}
            isWrong={answered === 'a4' && currect !== 'a4'}
          />
        )}
        {a5 && (
          <Answer
            onClick={handleAnswerClick('a5')}
            text={a5}
            isCurrect={!!answered && currect === 'a5'}
            isWrong={answered === 'a5' && currect !== 'a5'}
          />
        )}
        {a6 && (
          <Answer
            onClick={handleAnswerClick('a6')}
            text={a6}
            isCurrect={!!answered && currect === 'a6'}
            isWrong={answered === 'a6' && currect !== 'a6'}
          />
        )}
      </ul>
    </div>
  );
};

export default Question;
