import React from 'react'
import { Question } from '../../../types'
import { StatisticsStore } from '../../../services/StatisticsStore'
import { Language } from '../../../enums'
import PercentProgress from '../../PercentProgress'
import { pluralize } from '../../../helpers/text'

type Props = {
  questionId: Question['id']
}

const QuestionStatisticProgress = ({ questionId }: Props) => {
  const [correct, wrong] = StatisticsStore.getQuestionStatistics(questionId, Language.Russian)

  return (
    <PercentProgress
      leftLabel={({ leftValue }) => (
        <>
          <b>
            {leftValue}
            {' '}
            {pluralize(leftValue, 'раз', 'раза', 'раз')}
          </b>
          <br />
          верно
        </>
      )}
      leftValue={correct}
      rightLabel={({ rightValue }) => (
        <>
          <b>
            {rightValue}
            {' '}
            {pluralize(rightValue, 'раз', 'раза', 'раз')}
          </b>
          <br />
          неверно
        </>
      )}
      rightValue={wrong}
      middleValue={0}
      middleLabel={({ leftPercent, rightPercent }) => (!leftPercent && !rightPercent && '0%') || ''}
      max={correct + wrong}
      darkColors
    />
  )
}

export default QuestionStatisticProgress
