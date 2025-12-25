import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import CheckStatusBtn from '../CheckStatusBtn/CheckStatusBtn'
import { useFirebase } from '../../contexts/FirebaseContext'
import { FirebaseQuestionState, QuestionId } from '../../types'
import dayjs from 'dayjs'

type Props = {
  questionId: QuestionId
  disabled?: boolean
}

const QuestionCheckStatus = ({ questionId, disabled = false }: Props) => {
  const { updateQuestionStateById, getQuestionStateById, deleteQuestionStateById } = useFirebase()
  const [loading, setLoading] = useState(false)
  const [questionState, setQuestionState] = useState<FirebaseQuestionState | null>()

  const getQuestionState = async () => {
    try {
      setQuestionState(null)
      setLoading(true)

      const state = await getQuestionStateById(questionId)
      if (state) {
        setQuestionState(state)
      }
    } catch (error) {
      console.error(error)
      alert('Error get!')
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 100)
    }
  }

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

  useEffect(() => {
    getQuestionState()
  }, [questionId])

  const handleClick = async () => {
    if (!questionState) {
      await updateQuestionState()
    } else {
      await deleteQuestionState()
    }
  }

  return (
    <Box mt={2}>
      <CheckStatusBtn
        disabled={disabled}
        label={''}
        lastCheckedDate={questionState?.checkLastDate}
        loading={loading}
        onClick={handleClick}
      />
    </Box>
  )
}

export default QuestionCheckStatus
