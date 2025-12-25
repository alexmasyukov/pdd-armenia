import React from 'react'
import clsx from 'clsx'

type LabelFunc = ({
  leftValue,
  leftPercent,
  rightValue,
  rightPercent,
  middleValue,
  middlePercent,
}: {
  leftValue: number
  leftPercent: number
  rightValue: number
  rightPercent: number
  middleValue: number
  middlePercent: number
}) => string | React.ReactNode

type Props = {
  darkColors?: boolean

  max: number

  leftValue: number
  leftLabel?: LabelFunc

  rightValue: number
  rightLabel?: LabelFunc

  middleValue: number
  middleLabel?: LabelFunc
}

const PercentProgress = ({
  leftLabel,
  leftValue,
  rightValue,
  rightLabel,
  middleValue,
  middleLabel,
  max,
  darkColors,
}: Props) => {
  const middlePercent = Math.round((middleValue / max) * 100)
  const leftPercent = Math.round((leftValue / max) * 100)
  const rightPercent = Math.round((rightValue / max) * 100)

  return (
    <div
      className={clsx('percent', {
        'dark-colors': darkColors,
      })}
    >
      <div className='values'>
        {/*style={{ width: leftPercent + '%' }}*/}
        {leftPercent > 0 && (
          <div>
            {leftLabel?.({
              leftValue,
              leftPercent,
              rightValue,
              rightPercent,
              middleValue,
              middlePercent,
            })}
          </div>
        )}

        <div style={{ width: middlePercent + '%' }}>
          {middleLabel?.({
            leftValue,
            leftPercent,
            rightValue,
            rightPercent,
            middleValue,
            middlePercent,
          })}
        </div>

        {/*style={{ width: rightPercent + '%' }}*/}
        {rightPercent > 0 && (
          <div className='wrong'>
            {rightLabel?.({
              leftValue,
              leftPercent,
              rightValue,
              rightPercent,
              middleValue,
              middlePercent,
            })}
          </div>
        )}
      </div>
      <div className='scale'>
        <div className='correct' style={{ width: leftPercent + '%' }} />
        <div className='not-answered' style={{ width: middlePercent + '%' }} />
        <div className='wrong' style={{ width: rightPercent + '%' }} />
      </div>
    </div>
  )
}

export default PercentProgress
