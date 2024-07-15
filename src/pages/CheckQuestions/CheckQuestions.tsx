import { useAppState } from '../../contexts/AppStateContext/AppStateContext'
import { useEffect, useState } from 'react'
import { Group } from '../../components/Firebase/types'
import { useFirebase } from '../../contexts/FirebaseContext'

// questions table
// qIdExcel
// checkInPDF boolean false
// checkInApp boolean false

const CheckQuestions = () => {
  const { content } = useAppState()
  const { fetchGroups } = useFirebase()
  const [groups, setGroups] = useState<Group[]>([])

  useEffect(() => {
    const getGroups = async () => {
      const fetchedGroups = await fetchGroups()
      setGroups(fetchedGroups)
    }
    getGroups()
  }, [fetchGroups])

  const questionsToGroupIdsHash = groups.reduce<Record<string, string[]>>((acc, currGroup) => {
    currGroup.questionIds.forEach((qId) => {
      if (acc[qId]) {
        acc[qId].push(currGroup.id)
      } else {
        acc[qId] = [currGroup.id]
      }
    })

    return acc
  }, {})

  const groupsHash = groups.reduce<Record<string, Group>>((acc, currGroup) => {
    acc[currGroup.id] = currGroup
    return acc
  }, {})

  const getGroupNameById = (id: string) => {
    return groupsHash[id]?.name || <span style={{ color: 'red' }}>NONE</span>
  }

  console.log(groups)

  return (
    <div>
      <h1>Check Questions</h1>

      {content.questions.map((q) => {
        const groupsIds = questionsToGroupIdsHash?.[q.id]
        return (
          <>
            <div>
              <b>{q.id} – {q.q} </b>
              {groupsIds ? (
                <ul>
                  {groupsIds.map((gId) => (
                    <li key={gId}>{getGroupNameById(gId)}</li>
                  ))}
                </ul>
              ) : (
                <span style={{ color: 'red' }}>NONE</span>
              )}
            </div>
            <hr style={{opacity: .2}}/>
          </>
        )
      })}
    </div>
  )
}

export default CheckQuestions
