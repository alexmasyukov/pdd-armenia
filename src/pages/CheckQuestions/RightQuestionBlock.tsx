import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import LoadingButton from '@mui/lab/LoadingButton'
import s from './CheckQuestions.module.scss'
import { LeftQuestion } from './CheckQuestionsLoader'

type Ru2026QuestionRaw = {
  id: number
  gid: string
  tid: string
  q: string
  a1: string
  a2: string
  a3: string
  a4: string
  a5: string
  a6: string
  correct: string
  img: string
}

type Ru2026Question = Ru2026QuestionRaw & {
  findValue: string
  updatedAt?: string
  oldId?: string
  isStrange?: boolean
}

type Props = {
  newQuestion: Ru2026Question
  oldQuestion: LeftQuestion
}

const RightQuestionBlock = ({ newQuestion, oldQuestion }: Props) => {
  const [sending, setSending] = useState(false)

  if (newQuestion.id === 1) console.log('newQuestion', newQuestion)

  // Инициализируем один объект с oldId из oldQuestion если не задан
  const [question, setQuestion] = useState<Ru2026Question>(() => ({
    ...newQuestion,
    oldId: newQuestion.oldId ? newQuestion.oldId : String(oldQuestion?.id ?? ''),
  }))

  // useEffect(() => {
  //   setQuestion((prev) => ({
  //     ...prev,
  //     oldId: newQuestion.oldId ?? prev.oldId ?? String(oldQuestion?.id ?? ''),
  //   }))
  // }, [[newQuestion.oldId]])

  const handleMatchQuestion = async () => {
    setSending(true)

    // Берём актуальные значения из input'ов
    const oldIdInput = document.getElementById(`oldId-${question.id}`) as HTMLInputElement
    const isStrangeInput = document.getElementById(`isStrange-${question.id}`) as HTMLInputElement

    const updatedAt = new Date().toISOString()

    const updatedQuestion: Ru2026Question = {
      ...question,
      oldId: oldIdInput?.value ?? question.oldId ?? '',
      updatedAt,
      tid: oldQuestion?.tid ?? question.tid,
      img: oldQuestion?.img ?? question.img,
      isStrange: isStrangeInput?.checked ?? false,
    }

    try {
      const response = await fetch(`http://localhost:8888/pdd/${question.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: question.id,
          content: updatedQuestion,
        }),
      })

      if (response.ok) {
        setQuestion(updatedQuestion)
      } else {
        alert(`Ошибка отправки: ${response.status}`)
      }
    } catch (error) {
      console.error(error)
      alert('Ошибка сети при отправке')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className={s.questionBlock}>
      <div className={s.questionId}>id: {question.id}</div>

      <div className={s.questionImage}>
        {question.img ? (
          <img
            src={`${process.env.PUBLIC_URL}/images/questions/${question.gid}/${question.img}.jpg`}
            alt=''
          />
        ) : (
          <div>без изображения</div>
        )}
      </div>

      <div className={s.questionText}>
        <b>{question.q}</b>
      </div>

      <ul className={s.ul}>
        {question.a1 && <li className={clsx({ [s.active]: question.correct === 'a1' })}>1. {question.a1}</li>}
        {question.a2 && <li className={clsx({ [s.active]: question.correct === 'a2' })}>2. {question.a2}</li>}
        {question.a3 && <li className={clsx({ [s.active]: question.correct === 'a3' })}>3. {question.a3}</li>}
        {question.a4 && <li className={clsx({ [s.active]: question.correct === 'a4' })}>4. {question.a4}</li>}
        {question.a5 && <li className={clsx({ [s.active]: question.correct === 'a5' })}>5. {question.a5}</li>}
        {question.a6 && <li className={clsx({ [s.active]: question.correct === 'a6' })}>6. {question.a6}</li>}
      </ul>

      <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <label>old-id:</label>
        <input
          type='text'
          defaultValue={question.oldId}
          id={`oldId-${question.id}`}
          className={s.oldIdInput}
        />
      </div>

      <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <LoadingButton
          onClick={handleMatchQuestion}
          loading={sending}
          disabled={sending}
          variant='outlined'
          size='small'
          color={question.updatedAt ? 'info' : 'secondary'}
        >
          {question.updatedAt
            ? `Обновлено ${new Date(question.updatedAt).toLocaleDateString('ru-RU')}, ${new Date(question.updatedAt).toLocaleTimeString('ru-RU')}`
            : 'Вопросы совпадают'}
        </LoadingButton>

        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
          <input type='checkbox' id={`isStrange-${question.id}`} defaultChecked={question.isStrange} />
          Это спорный вопрос
        </label>
      </div>
    </div>
  )
}

export default RightQuestionBlock
