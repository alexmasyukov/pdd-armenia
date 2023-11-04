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
    const center = Math.round(382 / 39 / 2) + 1;
    console.log(center);

    if (numbersContainer.current) {
      // const activeNumber = numbersContainer.current.querySelector(`.index-${activeQuestionIndex}`);
      const activeNumber = numbersContainer.current.querySelector(`.active`);
      if (activeNumber) {
        console.log(activeNumber);
        const left = activeNumber.getBoundingClientRect().x;
        console.log(left);

        if (activeQuestionIndex > center) {
          scrollContainer.current?.scrollTo({
            left: (activeQuestionIndex - (center - 1)) * 39,

            behavior: 'smooth',
          });
        }

        // activeNumber.scrollIntoView({ behavior: 'smooth', inline: 'end', block: 'end' }); //,
        // activeNumber.getBoundingClientRect()
        // scrollContainer.current?.scrollTo({
        //   left: activeNumber.getBoundingClientRect().left + activeNumber.getBoundingClientRect().width + 5,
        //   behavior: 'smooth',
        // });
      }
    }
  }, [activeQuestionIndex]);

  return (
    <div className='answer-history'>
      <ScrollContainer innerRef={scrollContainer} vertical={false}>
        <ul ref={numbersContainer} className='question-numbers'>
          {answerHistory.map((item, index) => (
            <li
              key={index}
              className={clsx(
                `index-${activeQuestionIndex}`,
                {
                  active: item.questionIndex === activeQuestionIndex,
                  'move-to': item.questionIndex === activeQuestionIndex + 1,
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
