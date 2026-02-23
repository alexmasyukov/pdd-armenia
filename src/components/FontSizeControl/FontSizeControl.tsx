import { useState } from 'react'
import { PiGearLight } from 'react-icons/pi'
import Popover from '@mui/material/Popover'
import {
  FONT_SIZE_QUESTION_DEFAULT,
  FONT_SIZE_ANSWER_DEFAULT,
  FONT_SIZE_MIN,
  FONT_SIZE_MAX,
} from '../../config/verificationConfig'
import s from './FontSizeControl.module.scss'

const STORAGE_KEY_QUESTION = 'fontSize-question'
const STORAGE_KEY_ANSWER = 'fontSize-answer'

const readFromStorage = (key: string, defaultValue: number): number => {
  try {
    const val = localStorage.getItem(key)
    return val ? parseInt(val, 10) : defaultValue
  } catch {
    return defaultValue
  }
}

const saveToStorage = (key: string, value: number) => {
  try {
    localStorage.setItem(key, String(value))
  } catch {
    // ignore
  }
}

interface Props {
  onQuestionFontSizeChange: (value: number) => void
  onAnswerFontSizeChange: (value: number) => void
}

const FontSizeControl = ({ onQuestionFontSizeChange, onAnswerFontSizeChange }: Props) => {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null)
  const [questionSize, setQuestionSize] = useState(() =>
    readFromStorage(STORAGE_KEY_QUESTION, FONT_SIZE_QUESTION_DEFAULT)
  )
  const [answerSize, setAnswerSize] = useState(() =>
    readFromStorage(STORAGE_KEY_ANSWER, FONT_SIZE_ANSWER_DEFAULT)
  )

  const changeQuestion = (delta: number) => {
    const next = Math.min(FONT_SIZE_MAX, Math.max(FONT_SIZE_MIN, questionSize + delta))
    saveToStorage(STORAGE_KEY_QUESTION, next)
    setQuestionSize(next)
    onQuestionFontSizeChange(next)
  }

  const resetQuestion = () => {
    saveToStorage(STORAGE_KEY_QUESTION, FONT_SIZE_QUESTION_DEFAULT)
    setQuestionSize(FONT_SIZE_QUESTION_DEFAULT)
    onQuestionFontSizeChange(FONT_SIZE_QUESTION_DEFAULT)
  }

  const changeAnswer = (delta: number) => {
    const next = Math.min(FONT_SIZE_MAX, Math.max(FONT_SIZE_MIN, answerSize + delta))
    saveToStorage(STORAGE_KEY_ANSWER, next)
    setAnswerSize(next)
    onAnswerFontSizeChange(next)
  }

  const resetAnswer = () => {
    saveToStorage(STORAGE_KEY_ANSWER, FONT_SIZE_ANSWER_DEFAULT)
    setAnswerSize(FONT_SIZE_ANSWER_DEFAULT)
    onAnswerFontSizeChange(FONT_SIZE_ANSWER_DEFAULT)
  }

  return (
    <>
      <div
        className='favorite-btn report-btn'
        onClick={(e) => setAnchor(e.currentTarget)}
      >
        <PiGearLight size={16} /> Настройка шрифтов
      </div>

      <Popover
        open={Boolean(anchor)}
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <div className={s.popover}>
          <div className={s.row}>
            <span className={s.label}>Размер шрифта вопроса</span>
            <span className={s.link} onClick={() => changeQuestion(-1)}>−A</span>
            <span className={s.value}>{questionSize}</span>
            <span className={s.link} onClick={() => changeQuestion(+1)}>+A</span>
            <span className={s.reset} onClick={resetQuestion}>сбросить</span>
          </div>
          <div className={s.row}>
            <span className={s.label}>Размер шрифта ответа</span>
            <span className={s.link} onClick={() => changeAnswer(-1)}>−A</span>
            <span className={s.value}>{answerSize}</span>
            <span className={s.link} onClick={() => changeAnswer(+1)}>+A</span>
            <span className={s.reset} onClick={resetAnswer}>сбросить</span>
          </div>
          <div className={s.closeRow}>
            <span className={s.reset} onClick={() => setAnchor(null)}>закрыть</span>
          </div>
        </div>
      </Popover>
    </>
  )
}

export default FontSizeControl
