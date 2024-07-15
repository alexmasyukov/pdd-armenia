import { initializeApp } from 'firebase/app'
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  QuerySnapshot,
  updateDoc,
} from 'firebase/firestore'
import { Group } from '../components/Firebase/types'
import { firebaseConfig } from '../config/firebase'

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const fetchGroups = async (): Promise<Group[]> => {
  const groupsCollection = collection(db, 'groups')
  const q = query(groupsCollection, orderBy('order'))
  const groupSnapshot: QuerySnapshot<DocumentData> = await getDocs(q)
  return groupSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Group[]
}

const fetchGroup = async (id: string): Promise<Group | null> => {
  const docRef = doc(db, 'groups', id)
  const docSnap = await getDoc(docRef)
  return docSnap.exists() ? (docSnap.data() as Group) : null
}

const addQuestionToGroup = async (groupId: string, questionId: string): Promise<void> => {
  const groupRef = doc(db, 'groups', groupId)
  await updateDoc(groupRef, {
    questionIds: arrayUnion(questionId),
  })
}

const removeQuestionFromGroup = async (groupId: string, questionId: string): Promise<void> => {
  const groupRef = doc(db, 'groups', groupId)
  await updateDoc(groupRef, {
    questionIds: arrayRemove(questionId),
  })
}

const questionGetCheckInApp = async (questionId: string): Promise<boolean> => {
  const questionRef = doc(db, 'questions', questionId)
  const questionSnap = await getDoc(questionRef)
  return questionSnap.data()?.checkInApp
}

const questionSetCheckInApp = async (questionId: string, checkInApp: boolean): Promise<void> => {
  const questionRef = doc(db, 'questions', questionId)
  await updateDoc(questionRef, {
    checkInApp,
  })
}

export {
  db,
  fetchGroups,
  fetchGroup,
  addQuestionToGroup,
  removeQuestionFromGroup,
  questionGetCheckInApp,
  questionSetCheckInApp,
}
