import React from 'react'
import { QuestionStatus } from '../../enums'
import { AnswerHistory } from '../../types'
import PercentProgress from '../PercentProgress'

interface Props {
  answerHistory: AnswerHistory
}

const Percent: React.FC<Props> = ({ answerHistory }) => {
  const { correct, wrong, notAnswered } = answerHistory.reduce(
    (acc, item) => {
      if (item.status === QuestionStatus.Correct) {
        acc.correct += 1
      }
      if (item.status === QuestionStatus.Wrong) {
        acc.wrong += 1
      }
      if (item.status === QuestionStatus.NotAnswered) {
        acc.notAnswered += 1
      }

      return acc
    },
    { correct: 0, wrong: 0, notAnswered: 0 }
  )

  return (
    <PercentProgress
      leftLabel={({ leftPercent }) => `${leftPercent}%`}
      leftValue={correct}
      rightLabel={({ rightPercent }) => `${rightPercent}%`}
      rightValue={wrong}
      middleValue={notAnswered}
      middleLabel={({ leftPercent, rightPercent }) => (!leftPercent && !rightPercent && '0%') || ''}
      max={answerHistory.length}
    />
  )
}

export default Percent
