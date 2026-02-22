import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { useFirebase } from '../../contexts/FirebaseContext'
import { FirebaseGroup, QuestionId } from '../../types'
import s from './My.module.scss'

type Props = {
  questionId: QuestionId
  groups?: FirebaseGroup[]
  onGroupsChange?: (groups: FirebaseGroup[]) => void
}

const AddQuestion = ({ questionId, groups: groupsProp, onGroupsChange }: Props) => {
  const [groups, setGroups] = useState<FirebaseGroup[]>(groupsProp ?? [])
  const { fetchGroups, addQuestionToGroup, removeQuestionFromGroup } = useFirebase()

  useEffect(() => {
    if (groupsProp !== undefined) {
      setGroups(groupsProp)
      return
    }
    fetchGroups().then(setGroups).catch(console.error)
  }, [groupsProp])

  const refreshGroups = async () => {
    const fetched = await fetchGroups()
    setGroups(fetched)
    onGroupsChange?.(fetched)
  }

  const handleAddQuestion = async (groupId: string) => {
    try {
      await addQuestionToGroup(groupId, questionId)
      await refreshGroups()
    } catch (error) {
      console.error(error)
      alert('Error!')
    }
  }

  const handleRemoveQuestion = async (groupId: string) => {
    try {
      await removeQuestionFromGroup(groupId, questionId)
      await refreshGroups()
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
          <th>Name</th>
          <th>Count</th>
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
              <td>{group.name}</td>
              <td>{group.questionIds.length}</td>
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
