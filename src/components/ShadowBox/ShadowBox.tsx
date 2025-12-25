import React from 'react'
import s from './ShadowBox.module.scss'

type Props = {
  children?: React.ReactNode
}

const ShadowBox: React.FC<Props> = ({ children }) => {
  return <div className={s.box}>{children}</div>
}

export default ShadowBox
