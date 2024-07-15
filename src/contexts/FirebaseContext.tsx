import React, { createContext, ReactNode, useContext } from 'react'
import { Firestore } from 'firebase/firestore'
import {
  addQuestionToGroup,
  db,
  fetchGroup,
  fetchGroups,
  questionGetCheckInApp,
  questionSetCheckInApp,
  removeQuestionFromGroup,
} from '../services/firebase'
import { Group } from '../components/Firebase/types'

interface FirebaseContextProps {
  db: Firestore
  fetchGroups: () => Promise<Group[]>
  fetchGroup: (id: string) => Promise<Group | null>
  addQuestionToGroup: (groupId: string, questionId: string) => Promise<void>
  removeQuestionFromGroup: (groupId: string, questionId: string) => Promise<void>
  questionSetCheckInApp: (questionId: string, checkInApp: boolean) => Promise<void>
  questionGetCheckInApp: (questionId: string) => Promise<boolean>
}

const FirebaseContext = createContext<FirebaseContextProps | undefined>(undefined)

export const useFirebase = (): FirebaseContextProps => {
  const context = useContext(FirebaseContext)
  if (!context) {
    throw new Error('useFirebase must be used within a FirebaseProvider')
  }
  return context
}

export const FirebaseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <FirebaseContext.Provider
      value={{
        db,
        fetchGroups,
        fetchGroup,
        addQuestionToGroup,
        removeQuestionFromGroup,
        questionSetCheckInApp,
        questionGetCheckInApp,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  )
}
