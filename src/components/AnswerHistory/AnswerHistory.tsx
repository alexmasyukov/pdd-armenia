import React, { useEffect, useRef } from 'react'
import clsx from 'clsx'
import ScrollContainer from 'react-indiana-drag-scroll'
import { AnswerHistory as AnswerHistoryType, QuestionIndex } from '../../types'
import { QuestionStatus } from '../../enums'

interface Props {
  answerHistory: AnswerHistoryType
  activeQuestionIndex: QuestionIndex
  onSelectQuestion: (questionIndex: QuestionIndex) => () => void
}

const AnswerHistory: React.FC<Props> = ({ answerHistory, activeQuestionIndex, onSelectQuestion }) => {
  const scrollContainer = useRef<HTMLDivElement>(null)
  const numbersContainer = useRef<HTMLUListElement>(null)

  useEffect(() => {
    if (!scrollContainer.current || !numbersContainer.current) {
      return
    }

    const scrollContainerWidth = scrollContainer.current.clientWidth
    const center = Math.floor(scrollContainerWidth / 39 / 2)
    const activeNumber = numbersContainer.current.querySelector(`.active`)

    if (activeNumber) {
      if (activeQuestionIndex > center) {
        scrollContainer.current?.scrollTo({
          left: (activeQuestionIndex - center) * 39,
          behavior: 'smooth',
        })
      }
    }
  }, [activeQuestionIndex])

  return (
    <div className='answer-history'>
      <ScrollContainer innerRef={scrollContainer} vertical={false}>
        <ul ref={numbersContainer} className='question-numbers'>
          {answerHistory.map((item, index) => (
            <li
              key={index}
              className={clsx(
                {
                  active: item.questionIndex === activeQuestionIndex,
                },
                { correct: item.status === QuestionStatus.Correct },
                { wrong: item.status === QuestionStatus.Wrong },
                { 'not-answered': item.status === QuestionStatus.NotAnswered }
              )}
              onClick={onSelectQuestion(index)}
            >
              {index + 1}
            </li>
          ))}
        </ul>
      </ScrollContainer>
    </div>
  )
}

export default AnswerHistory
