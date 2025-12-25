import React, { createContext, ReactNode, useContext } from 'react'
import { Firestore } from 'firebase/firestore'
import {
  db,
  fetchGroup,
  fetchGroups,
  addQuestionToGroup,
  removeQuestionFromGroup,
  getQuestionStateById,
  getQuestionsStates,
  updateQuestionStateById,
  deleteQuestionStateById,
} from '../services/firebase'

interface FirebaseContextProps {
  db: Firestore
  fetchGroups: typeof fetchGroups
  fetchGroup: typeof fetchGroup
  addQuestionToGroup: typeof addQuestionToGroup
  removeQuestionFromGroup: typeof removeQuestionFromGroup
  getQuestionStateById: typeof getQuestionStateById
  getQuestionsStates: typeof getQuestionsStates
  updateQuestionStateById: typeof updateQuestionStateById
  deleteQuestionStateById: typeof deleteQuestionStateById
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
        getQuestionStateById,
        getQuestionsStates,
        updateQuestionStateById,
        deleteQuestionStateById,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  )
}
