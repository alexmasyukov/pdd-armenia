import React from 'react';
import clsx from 'clsx';
import ScrollContainer from 'react-indiana-drag-scroll';
import { AnswerHistory as AnswerHistoryType, QuestionIndex } from '../../types';

interface Props {
  answerHistory: AnswerHistoryType;
  activeQuestionIndex: QuestionIndex;
  onSelectQuestion: (questionIndex: QuestionIndex) => () => void;
}

const AnswerHistory: React.FC<Props> = ({ answerHistory, activeQuestionIndex, onSelectQuestion }) => {
  return (
    <div className='answer-history'>
      <ScrollContainer>
        <ul className='question-numbers'>
          {answerHistory.map((item, index) => (
            <>
              <li
                key={index}
                className={clsx({ active: activeQuestionIndex === item.questionIndex }, item.status)}
                onClick={onSelectQuestion(index)}
              >
                {index + 1}
              </li>
              <li
                key={index}
                className={clsx({ active: activeQuestionIndex === item.questionIndex }, item.status)}
                onClick={onSelectQuestion(index)}
              >
                {index + 1}
              </li>
              <li
                key={index}
                className={clsx({ active: activeQuestionIndex === item.questionIndex }, item.status)}
                onClick={onSelectQuestion(index)}
              >
                {index + 1}
              </li>
              <li
                key={index}
                className={clsx({ active: activeQuestionIndex === item.questionIndex }, item.status)}
                onClick={onSelectQuestion(index)}
              >
                {index + 1}
              </li>
              <li
                key={index}
                className={clsx({ active: activeQuestionIndex === item.questionIndex }, item.status)}
                onClick={onSelectQuestion(index)}
              >
                {index + 1}
              </li>
              <li
                key={index}
                className={clsx({ active: activeQuestionIndex === item.questionIndex }, item.status)}
                onClick={onSelectQuestion(index)}
              >
                {index + 1}
              </li>
              <li
                key={index}
                className={clsx({ active: activeQuestionIndex === item.questionIndex }, item.status)}
                onClick={onSelectQuestion(index)}
              >
                {index + 1}
              </li>
              <li
                key={index}
                className={clsx({ active: activeQuestionIndex === item.questionIndex }, item.status)}
                onClick={onSelectQuestion(index)}
              >
                {index + 1}
              </li>
              <li
                key={index}
                className={clsx({ active: activeQuestionIndex === item.questionIndex }, item.status)}
                onClick={onSelectQuestion(index)}
              >
                {index + 1}
              </li>
              <li
                key={index}
                className={clsx({ active: activeQuestionIndex === item.questionIndex }, item.status)}
                onClick={onSelectQuestion(index)}
              >
                {index + 1}
              </li>
              <li
                key={index}
                className={clsx({ active: activeQuestionIndex === item.questionIndex }, item.status)}
                onClick={onSelectQuestion(index)}
              >
                {index + 1}
              </li>
              <li
                key={index}
                className={clsx({ active: activeQuestionIndex === item.questionIndex }, item.status)}
                onClick={onSelectQuestion(index)}
              >
                {index + 1}
              </li>
              <li
                key={index}
                className={clsx({ active: activeQuestionIndex === item.questionIndex }, item.status)}
                onClick={onSelectQuestion(index)}
              >
                {index + 1}
              </li>
              <li
                key={index}
                className={clsx({ active: activeQuestionIndex === item.questionIndex }, item.status)}
                onClick={onSelectQuestion(index)}
              >
                {index + 1}
              </li>
              <li
                key={index}
                className={clsx({ active: activeQuestionIndex === item.questionIndex }, item.status)}
                onClick={onSelectQuestion(index)}
              >
                {index + 1}
              </li>
              <li
                key={index}
                className={clsx({ active: activeQuestionIndex === item.questionIndex }, item.status)}
                onClick={onSelectQuestion(index)}
              >
                {index + 1}
              </li>
              <li
                key={index}
                className={clsx({ active: activeQuestionIndex === item.questionIndex }, item.status)}
                onClick={onSelectQuestion(index)}
              >
                {index + 1}
              </li>
              <li
                key={index}
                className={clsx({ active: activeQuestionIndex === item.questionIndex }, item.status)}
                onClick={onSelectQuestion(index)}
              >
                {index + 1}
              </li>
              <li
                key={index}
                className={clsx({ active: activeQuestionIndex === item.questionIndex }, item.status)}
                onClick={onSelectQuestion(index)}
              >
                {index + 1}
              </li>
              <li
                key={index}
                className={clsx({ active: activeQuestionIndex === item.questionIndex }, item.status)}
                onClick={onSelectQuestion(index)}
              >
                {index + 1}
              </li>
              <li
                key={index}
                className={clsx({ active: activeQuestionIndex === item.questionIndex }, item.status)}
                onClick={onSelectQuestion(index)}
              >
                {index + 1}
              </li>
              <li
                key={index}
                className={clsx({ active: activeQuestionIndex === item.questionIndex }, item.status)}
                onClick={onSelectQuestion(index)}
              >
                {index + 1}
              </li>
              <li
                key={index}
                className={clsx({ active: activeQuestionIndex === item.questionIndex }, item.status)}
                onClick={onSelectQuestion(index)}
              >
                {index + 1}
              </li>
              <li
                key={index}
                className={clsx({ active: activeQuestionIndex === item.questionIndex }, item.status)}
                onClick={onSelectQuestion(index)}
              >
                {index + 1}
              </li>
              <li
                key={index}
                className={clsx({ active: activeQuestionIndex === item.questionIndex }, item.status)}
                onClick={onSelectQuestion(index)}
              >
                {index + 1}
              </li>
              <li
                key={index}
                className={clsx({ active: activeQuestionIndex === item.questionIndex }, item.status)}
                onClick={onSelectQuestion(index)}
              >
                {index + 1}
              </li>
              <li
                key={index}
                className={clsx({ active: activeQuestionIndex === item.questionIndex }, item.status)}
                onClick={onSelectQuestion(index)}
              >
                {index + 1}
              </li>
              <li
                key={index}
                className={clsx({ active: activeQuestionIndex === item.questionIndex }, item.status)}
                onClick={onSelectQuestion(index)}
              >
                {index + 1}
              </li>
              <li
                key={index}
                className={clsx({ active: activeQuestionIndex === item.questionIndex }, item.status)}
                onClick={onSelectQuestion(index)}
              >
                {index + 1}
              </li>
              <li
                key={index}
                className={clsx({ active: activeQuestionIndex === item.questionIndex }, item.status)}
                onClick={onSelectQuestion(index)}
              >
                {index + 1}
              </li>
              <li
                key={index}
                className={clsx({ active: activeQuestionIndex === item.questionIndex }, item.status)}
                onClick={onSelectQuestion(index)}
              >
                {index + 1}
              </li>
              <li
                key={index}
                className={clsx({ active: activeQuestionIndex === item.questionIndex }, item.status)}
                onClick={onSelectQuestion(index)}
              >
                {index + 1}
              </li>
              <li
                key={index}
                className={clsx({ active: activeQuestionIndex === item.questionIndex }, item.status)}
                onClick={onSelectQuestion(index)}
              >
                {index + 1}
              </li>
              <li
                key={index}
                className={clsx({ active: activeQuestionIndex === item.questionIndex }, item.status)}
                onClick={onSelectQuestion(index)}
              >
                {index + 1}
              </li>
            </>
          ))}
        </ul>
      </ScrollContainer>
    </div>
  );
};

export default AnswerHistory;
