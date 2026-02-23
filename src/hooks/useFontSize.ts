import { useState } from 'react'
import {
  FONT_SIZE_QUESTION_DEFAULT,
  FONT_SIZE_ANSWER_DEFAULT,
} from '../config/verificationConfig'

export const FONT_SIZE_STORAGE_KEY_QUESTION = 'fontSize-question'
export const FONT_SIZE_STORAGE_KEY_ANSWER = 'fontSize-answer'

const readFromStorage = (key: string, defaultValue: number): number => {
  try {
    const val = localStorage.getItem(key)
    return val ? parseInt(val, 10) : defaultValue
  } catch {
    return defaultValue
  }
}

export const useFontSize = () => {
  const [questionFontSize, setQuestionFontSize] = useState(() =>
    readFromStorage(FONT_SIZE_STORAGE_KEY_QUESTION, FONT_SIZE_QUESTION_DEFAULT)
  )
  const [answerFontSize, setAnswerFontSize] = useState(() =>
    readFromStorage(FONT_SIZE_STORAGE_KEY_ANSWER, FONT_SIZE_ANSWER_DEFAULT)
  )

  return { questionFontSize, answerFontSize, setQuestionFontSize, setAnswerFontSize }
}
