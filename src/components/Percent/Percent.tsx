import React from 'react';
import { QuestionStatus } from '../../enums';
import { AnswerHistory } from '../../types';

interface Props {
  answerHistory: AnswerHistory;
}

const Percent: React.FC<Props> = ({ answerHistory }) => {
  const { current, wrong, notAnswered } = answerHistory.reduce(
    (acc, item) => {
      if (item.status === QuestionStatus.Currect) {
        acc.current += 1;
      }
      if (item.status === QuestionStatus.Wrong) {
        acc.wrong += 1;
      }
      if (item.status === QuestionStatus.NotAnswered) {
        acc.notAnswered += 1;
      }

      return acc;
    },
    { current: 0, wrong: 0, notAnswered: 0 }
  );
  const max = answerHistory.length;
  const notAnsweredPercent = Math.round((notAnswered / max) * 100);
  const currectPercent = Math.round((current / max) * 100);
  const wrongPercent = Math.round((wrong / max) * 100);

  return (
    <div className='percent'>
      <div className='values'>
        {currectPercent > 0 && <div style={{ width: currectPercent + '%' }}>{currectPercent}%</div>}
        <div style={{ width: notAnsweredPercent + '%' }}>{!wrongPercent && !currectPercent && '0%'}</div>
        {wrongPercent > 0 && (
          <div className='wrong' style={{ width: wrongPercent + '%' }}>
            {wrongPercent}%
          </div>
        )}
      </div>
      <div className='scale'>
        <div className='currect' style={{ width: currectPercent + '%' }} />
        <div className='not-answered' style={{ width: notAnsweredPercent + '%' }} />
        <div className='wrong' style={{ width: wrongPercent + '%' }} />
      </div>
    </div>
  );
};

export default Percent;
