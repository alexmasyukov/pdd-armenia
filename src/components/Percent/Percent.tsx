import React from 'react';
import { QuestionStatus } from '../../enums';
import { AnswerHistory } from '../../types';

interface Props {
  answerHistory: AnswerHistory;
}

const Percent: React.FC<Props> = ({ answerHistory }) => {
  const { correct, wrong, notAnswered } = answerHistory.reduce(
    (acc, item) => {
      if (item.status === QuestionStatus.Correct) {
        acc.correct += 1;
      }
      if (item.status === QuestionStatus.Wrong) {
        acc.wrong += 1;
      }
      if (item.status === QuestionStatus.NotAnswered) {
        acc.notAnswered += 1;
      }

      return acc;
    },
    { correct: 0, wrong: 0, notAnswered: 0 }
  );
  const max = answerHistory.length;
  const notAnsweredPercent = Math.round((notAnswered / max) * 100);
  const correctPercent = Math.round((correct / max) * 100);
  const wrongPercent = Math.round((wrong / max) * 100);

  return (
    <div className='percent'>
      <div className='values'>
        {correctPercent > 0 && <div style={{ width: correctPercent + '%' }}>{correctPercent}%</div>}
        <div style={{ width: notAnsweredPercent + '%' }}>{!wrongPercent && !correctPercent && '0%'}</div>
        {wrongPercent > 0 && (
          <div className='wrong' style={{ width: wrongPercent + '%' }}>
            {wrongPercent}%
          </div>
        )}
      </div>
      <div className='scale'>
        <div className='correct' style={{ width: correctPercent + '%' }} />
        <div className='not-answered' style={{ width: notAnsweredPercent + '%' }} />
        <div className='wrong' style={{ width: wrongPercent + '%' }} />
      </div>
    </div>
  );
};

export default Percent;
