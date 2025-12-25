import React from 'react'
import { PiMagicWandLight } from 'react-icons/pi'

type Props = {
  onClick: () => void
}

const HelpBtn = ({ onClick }: Props) => (
  <div className={'favorite-btn report-btn help-btn'} onClick={onClick}>
    <PiMagicWandLight size={16} /> Подсказка
  </div>
)

export default HelpBtn
