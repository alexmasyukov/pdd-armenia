import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import ScrollContainer from 'react-indiana-drag-scroll';
import { AnswerHistory as AnswerHistoryType, QuestionIndex } from '../../types';

interface Props {
  answerHistory: AnswerHistoryType;
  activeQuestionIndex: QuestionIndex;
  onSelectQuestion: (questionIndex: QuestionIndex) => () => void;
}

const AnswerHistory: React.FC<Props> = ({ answerHistory, activeQuestionIndex, onSelectQuestion }) => {
  const scrollContainer = useRef<HTMLDivElement>(null);
  const numbersContainer = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (numbersContainer.current) {
      const activeNumber = numbersContainer.current.querySelector('.move-to');
      if (activeNumber) {
        activeNumber.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    }
  }, [activeQuestionIndex]);

  return (
    <div className='answer-history'>
      <ScrollContainer innerRef={scrollContainer}>
        <ul ref={numbersContainer} className='question-numbers'>
          {answerHistory.map((item, index) => (
            <li
              key={index}
              className={clsx(
                {
                  active: item.questionIndex === activeQuestionIndex,
                  'move-to': item.questionIndex === activeQuestionIndex + 2,
                },
                item.status
              )}
              onClick={onSelectQuestion(index)}
            >
              {index + 1}
            </li>
          ))}
        </ul>
      </ScrollContainer>
    </div>
  );
};

export default AnswerHistory;
