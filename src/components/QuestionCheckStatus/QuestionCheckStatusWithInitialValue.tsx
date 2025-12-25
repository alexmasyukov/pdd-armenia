import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import CheckStatusBtn from '../CheckStatusBtn/CheckStatusBtn'
import { useFirebase } from '../../contexts/FirebaseContext'
import { FirebaseQuestionState, QuestionId } from '../../types'
import dayjs from 'dayjs'

type Props = {
  questionId: QuestionId
  initialQuestionState: FirebaseQuestionState | null
}

const QuestionCheckStatusWithInitialValue = ({ questionId, initialQuestionState }: Props) => {
  const { updateQuestionStateById, deleteQuestionStateById } = useFirebase()
  const [loading, setLoading] = useState(false)
  const [questionState, setQuestionState] = useState<FirebaseQuestionState | null>(initialQuestionState)

  const updateQuestionState = async () => {
    const state: FirebaseQuestionState = {
      qAppId: String(questionId),
      checkLastDate: dayjs().format('DD.MM.YYYY, HH:mm'),
    }
    try {
      setLoading(true)

      await updateQuestionStateById(state)
      setQuestionState(state)
    } catch (error) {
      console.error(error)
      alert('Error set!')
    } finally {
      setLoading(false)
    }
  }

  const deleteQuestionState = async () => {
    try {
      setLoading(true)

      await deleteQuestionStateById(questionId)
      setQuestionState(null)
    } catch (error) {
      console.error(error)
      alert('Error delete!')
    } finally {
      setLoading(false)
    }
  }

  const handleClick = async () => {
    if (!questionState) {
      await updateQuestionState()
    } else {
      await deleteQuestionState()
    }
  }

  return (
    <Box>
      <CheckStatusBtn
        label={''}
        lastCheckedDate={questionState?.checkLastDate}
        loading={loading}
        onClick={handleClick}
      />
    </Box>
  )
}

export default QuestionCheckStatusWithInitialValue
