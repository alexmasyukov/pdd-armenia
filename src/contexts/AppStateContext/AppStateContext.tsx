import React, { createContext, useContext, useEffect, useState } from 'react'
import { getShowRightAnswersLocalStorageFlag, setShowRightAnswersLocalStorageFlag } from './utils'
import { BaseData } from '../../types'
import { getEmptyBaseData } from '../../helpers'
import groupsJson from '../../data/groups.json'

type Content = {
  loading: boolean
  groups: BaseData['groups']
  questions: BaseData['questions']
}

export interface AppState {
  showRightAnswers: boolean
  isLocalApp: boolean
  changeShowRightAnswersFlag: () => void
  content: Content
}

export const AppStateContext = createContext({} as AppState)

export const useAppState = () => useContext<AppState>(AppStateContext)

type ProviderProps = {
  children: React.ReactNode
}

const AppStateProvider = ({ children }: ProviderProps) => {
  const [showRightAnswers, setShowRightAnswers] = useState(getShowRightAnswersLocalStorageFlag())
  const isLocalApp = process.env.NODE_ENV === 'development'

  const [content, setContent] = useState({
    loading: true,
    ...getEmptyBaseData(),
  })

  const changeShowRightAnswersFlag = () => {
    setShowRightAnswers((prev) => !prev)
  }

  useEffect(() => {
    setShowRightAnswersLocalStorageFlag(showRightAnswers)
  }, [showRightAnswers])

  // load content (questions, groups)
  useEffect(() => {
    setTimeout(() => {
      import('././../../data/ru_2026.json').then((data) => {
        setContent({
          loading: false,
          groups: groupsJson.groups as BaseData['groups'],
          questions: data.default as BaseData['questions'],
        })
      })
    }, 700)
  }, [])

  return (
    <AppStateContext.Provider
      value={{
        showRightAnswers,
        isLocalApp,
        changeShowRightAnswersFlag,
        content,
      }}
    >
      {children}
    </AppStateContext.Provider>
  )
}

export default AppStateProvider
