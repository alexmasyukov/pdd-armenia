import { useParams } from 'react-router-dom'
import Questions from '../../components/Questions/Questions'
import { useAppState } from '../../contexts/AppStateContext/AppStateContext'
import TopicPlaceholder from '../../placeholders/TopicPlaceholder'
import { routes } from '../../router/constants'
import { Question } from '../../types'
import groupsData from '../../data/groups-version-2.json'

type DetailedGroup = {
  id: string
  name: string
  order: number
  questionIds: string[]
}

const groups = groupsData as DetailedGroup[]

function getIntersection(array1: Question[], array2: string[]): Question[] {
  const set2 = new Set(array2)
  return array1.filter((item) => set2.has(String(item.id)))
}

const DetailedTopic = () => {
  const { id: topicId } = useParams<'id'>()
  const { content } = useAppState()

  if (content.loading) {
    return <TopicPlaceholder />
  }

  const group = groups.find((g) => g.id === topicId)

  if (!group) {
    return <p>Группа не найдена</p>
  }

  const topicQuestions = getIntersection(content.questions, group.questionIds)

  return <Questions questions={topicQuestions} title={group.name} prevLink={routes.detailedTopics.path} />
}

export default DetailedTopic
