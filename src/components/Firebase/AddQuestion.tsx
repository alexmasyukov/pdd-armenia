import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { useFirebase } from '../../contexts/FirebaseContext'
import { FirebaseGroup, QuestionId } from '../../types'
import s from './My.module.scss'

type Props = {
  questionId: QuestionId
}

const AddQuestion = ({ questionId }: Props) => {
  const [groups, setGroups] = useState<FirebaseGroup[]>([])
  // const questionId = '6667';
  // const [questionId] = useState<string>(() => Math.floor(Math.random() * 10000).toString())
  const { fetchGroups, addQuestionToGroup, removeQuestionFromGroup } = useFirebase()

  useEffect(() => {
    const getGroups = async () => {
      const fetchedGroups = await fetchGroups()
      setGroups(fetchedGroups)
    }
    getGroups()
  }, [fetchGroups])

  const handleAddQuestion = async (groupId: string) => {
    try {
      await addQuestionToGroup(groupId, questionId)
      const fetchedGroups = await fetchGroups()
      setGroups(fetchedGroups) // Обновление данных после добавления
    } catch (error) {
      console.error(error)
      alert('Error!')
    }
  }

  const handleRemoveQuestion = async (groupId: string) => {
    try {
      await removeQuestionFromGroup(groupId, questionId)
      const fetchedGroups = await fetchGroups()
      setGroups(fetchedGroups) // Обновление данных после удаления
    } catch (error) {
      console.error(error)
      alert('Error!')
    }
  }

  const hasQuestionIdInGroups = groups.some((group) => group.questionIds.includes(String(questionId)))

  return (
    <table className={s.table}>
      <thead>
        <tr>
          {/*<th>ID</th>*/}
          <th>Name</th>
          <th>Count</th>
          {/*<th>Link</th>*/}
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr className={clsx(s.first, !hasQuestionIdInGroups && s.none)}>
          <td>{hasQuestionIdInGroups ? '+' : 'NONE'}</td>
          <td></td>
          <td></td>
        </tr>

        {groups.map((group) => {
          const hasQuestionId = group.questionIds.includes(String(questionId))
          return (
            <tr key={group.id} className={clsx({ [s.active]: hasQuestionId })}>
              {/*<td>{group.id}</td>*/}
              <td>{group.name}</td>
              <td>{group.questionIds.length}</td>
              {/*<td>*/}
              {/*  <Link to={`/group/${group.id}`}>View</Link>*/}
              {/*</td>*/}
              <td style={{ minWidth: '78px' }}>
                {!hasQuestionId && (
                  <button
                    onClick={() => handleAddQuestion(group.id)}
                    className={clsx(hasQuestionIdInGroups && s.opacity)}
                  >
                    Add
                  </button>
                )}

                {hasQuestionId && <button onClick={() => handleRemoveQuestion(group.id)}>Remove</button>}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default AddQuestion
