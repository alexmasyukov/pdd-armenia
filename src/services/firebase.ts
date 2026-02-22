import { initializeApp } from 'firebase/app'
import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDocs,
  getFirestore,
  orderBy,
  query,
  QuerySnapshot,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import { firebaseConfig } from '../config/firebase'
import { FirebaseGroup, FirebaseQuestionState, QuestionId } from '../types'
import { mockGroups } from '../mock/groups'
import { mockQuestionsState } from '../mock/questionsState'

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const fetchGroups = async (): Promise<FirebaseGroup[]> => {
  const groupsCollection = collection(db, 'groups')
  const q = query(groupsCollection, orderBy('order'))
  const groupSnapshot: QuerySnapshot<DocumentData> = await getDocs(q)
  return groupSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as FirebaseGroup[]
}

const fetchGroup = async (id: string): Promise<FirebaseGroup | null> => {
  // const docRef = doc(db, 'groups', id)
  // const docSnap = await getDoc(docRef)
  // return docSnap.exists() ? (docSnap.data() as FirebaseGroup) : null

  // get group from mockGroups
  const group = mockGroups.find((group) => group.id === id)
  return new Promise((resolve) => {
    resolve(group ?? null)
  })
}

const addQuestionToGroup = async (groupId: string, questionId: QuestionId): Promise<void> => {
  const groupRef = doc(db, 'groups', groupId)
  await updateDoc(groupRef, {
    questionIds: arrayUnion(String(questionId)),
  })
}

const removeQuestionFromGroup = async (groupId: string, questionId: QuestionId): Promise<void> => {
  const groupRef = doc(db, 'groups', groupId)
  await updateDoc(groupRef, {
    questionIds: arrayRemove(String(questionId)),
  })
}

const getQuestionStateById = async (questionId: QuestionId): Promise<FirebaseQuestionState | null> => {
  // const questionRef = doc(db, 'questions', String(questionId))
  // const questionSnap = await getDoc(questionRef)
  // return questionSnap.exists() ? (questionSnap.data() as FirebaseQuestionState) : null

  // get question from questionsState
  const questionState = mockQuestionsState.find(
    (questionState) => questionState.qAppId === String(questionId)
  )
  return new Promise((resolve) => {
    resolve(questionState ?? null)
  })
}

const getQuestionsStates = async (): Promise<FirebaseQuestionState[]> => {
  // const questionsCollection = collection(db, 'questions')
  // const q = query(questionsCollection)
  // const questionSnapshot: QuerySnapshot<DocumentData> = await getDocs(q)
  // return questionSnapshot.docs.map((doc) => ({
  //   qAppId: doc.id,
  //   ...doc.data(),
  // })) as FirebaseQuestionState[]

  // get all questions from questionsState
  return new Promise((resolve) => {
    resolve(mockQuestionsState)
  })
}

const updateQuestionStateById = async (state: FirebaseQuestionState): Promise<void> => {
  const questionRef = doc(db, 'questions', state.qAppId)
  await setDoc(questionRef, state, { merge: true })
}

const deleteQuestionStateById = async (questionId: QuestionId): Promise<void> => {
  const questionRef = doc(db, 'questions', String(questionId))
  await deleteDoc(questionRef)
}

export {
  db,
  fetchGroups,
  fetchGroup,
  addQuestionToGroup,
  removeQuestionFromGroup,
  getQuestionStateById,
  getQuestionsStates,
  updateQuestionStateById,
  deleteQuestionStateById,
}
