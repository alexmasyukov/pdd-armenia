import React, { useEffect, useState } from 'react'
import { useAppState } from '../../contexts/AppStateContext/AppStateContext'
import { useFirebase } from '../../contexts/FirebaseContext'
import { FirebaseGroup, FirebaseQuestionState, Question } from '../../types'
import CheckQuestionsContent from './CheckQuestionsContent'
import ru2026Data from '../../data/ru_2026.json'

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

export type Ru2026Question = Ru2026QuestionRaw & {
  findValue: string
  updatedAt?: string
  oldId?: string
  isStrange?: boolean
}

type FindObject = {
  q: string
  a1: string
  a2: string
  a3: string
  a4: string
  a5: string
  a6: string
}

export type LeftQuestion = Question & {
  find: FindObject
}

const normalizeText = (text: string): string => {
  return text.toLowerCase().replace(/[^a-zA-Zа-яёА-ЯЁ0-9]/g, '')
}

const ru2026InitialData: Ru2026Question[] = (ru2026Data as Ru2026QuestionRaw[]).map((q) => ({
  ...q,
  findValue: normalizeText(q.q),
}))

const CheckQuestionsLoader = () => {
  const { getQuestionsStates, fetchGroups } = useFirebase()
  const { content } = useAppState()

  const [loading, setLoading] = useState(true)
  const [groups, setGroups] = useState<FirebaseGroup[]>([])
  const [questionStates, setQuestionStates] = useState<Record<string, FirebaseQuestionState>>({})
  const [ru2026Questions, setRu2026Questions] = useState<Ru2026Question[]>([])
  const [leftQuestions, setLeftQuestions] = useState<LeftQuestion[]>([])

  useEffect(() => {
    const loadAllData = async () => {
      try {
        // Загружаем все данные параллельно
        const [groupsResult, statesResult, cloudResult] = await Promise.all([
          fetchGroups().catch((err) => {
            console.error('Error fetching groups:', err)
            return [] as FirebaseGroup[]
          }),
          getQuestionsStates().catch((err) => {
            console.error('Error fetching question states:', err)
            return [] as FirebaseQuestionState[]
          }),
          fetch('http://localhost:8888/pdd')
            .then((res) => (res.ok ? res.json() : []))
            .catch((err) => {
              console.error('Error fetching cloud questions:', err)
              return []
            }),
        ])

        // Устанавливаем группы
        setGroups(groupsResult)

        // Устанавливаем состояния вопросов
        const statesHash = statesResult.reduce<Record<string, FirebaseQuestionState>>((acc, curr) => {
          acc[curr.qAppId] = curr
          return acc
        }, {})
        setQuestionStates(statesHash)

        // Обрабатываем ru2026 с облачными данными
        const cloudQuestions: Array<{ id: number; content: Ru2026Question }> = cloudResult
        const processedRu2026 = ru2026InitialData.map((q) => {
          const cloudQuestion = cloudQuestions.find((cq) => cq.id === q.id)
          if (cloudQuestion) {
            return {
              ...cloudQuestion.content,
              findValue: normalizeText(cloudQuestion.content.q),
            }
          }
          return q
        })
        setRu2026Questions(processedRu2026)

        // Обрабатываем левые вопросы
        if (content.questions.length > 0) {
          const processedLeft = content.questions.map((q) => ({
            ...q,
            find: {
              q: normalizeText(q.q),
              a1: normalizeText(q.a1 || ''),
              a2: normalizeText(q.a2 || ''),
              a3: normalizeText(q.a3 || ''),
              a4: normalizeText(q.a4 || ''),
              a5: normalizeText(q.a5 || ''),
              a6: normalizeText(q.a6 || ''),
            },
          }))
          setLeftQuestions(processedLeft)
        }

        setLoading(false)
      } catch (error) {
        console.error('Error loading data:', error)
        setLoading(false)
      }
    }

    // Ждём пока content.questions загрузится
    if (!content.loading && content.questions.length > 0) {
      loadAllData()
    }
  }, [content.loading, content.questions, fetchGroups, getQuestionsStates])

  if (loading || content.loading) {
    return <div>Загрузка данных...</div>
  }

  return (
    <CheckQuestionsContent
      groups={groups}
      questionStates={questionStates}
      ru2026Questions={ru2026Questions}
      leftQuestions={leftQuestions}
    />
  )
}

export default CheckQuestionsLoader
