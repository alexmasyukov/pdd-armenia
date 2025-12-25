import { useParams } from 'react-router-dom'
import Questions from '../../components/Questions/Questions'
import { useAppState } from '../../contexts/AppStateContext/AppStateContext'
import TopicPlaceholder from '../../placeholders/TopicPlaceholder'
import { routes } from '../../router/constants'
import { useFirebase } from '../../contexts/FirebaseContext'
import { useEffect, useState } from 'react'
import { FirebaseGroup, Question } from '../../types'

function getIntersection(array1: Question[], array2: string[]): Question[] {
  const set2 = new Set(array2)
  return array1.filter((item) => set2.has(String(item.id)))
}

const DetailedTopic = () => {
  const { id: topicId } = useParams<'id'>()
  const { content } = useAppState()
  const { fetchGroup } = useFirebase()

  const [group, setGroup] = useState<FirebaseGroup | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const getGroup = async () => {
      const fetchedGroup = await fetchGroup(topicId!)
      if (fetchedGroup) {
        setGroup(fetchedGroup)
      }
    }

    setLoading(true)
    getGroup().finally(() => setLoading(false))
  }, [fetchGroup, topicId])

  // const topicQuestions = content.questions.filter((question) => question.gid === topicId);
  // const groupName = content.groups.find((group) => group.id === topicId)?.name;

  if (loading || content.loading) {
    return <TopicPlaceholder />
  }

  const topicQuestions = getIntersection(content.questions, group!.questionIds)

  return <Questions questions={topicQuestions} title={group!.name} prevLink={routes.detailedTopics.path} />
}

export default DetailedTopic
