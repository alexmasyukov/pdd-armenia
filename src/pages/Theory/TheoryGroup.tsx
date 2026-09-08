import { useParams } from 'react-router-dom'
import Questions from '../../components/Questions/Questions'
import { useAppState } from '../../contexts/AppStateContext/AppStateContext'
import TopicPlaceholder from '../../placeholders/TopicPlaceholder'
import { routes } from '../../router/constants'
import { Question } from '../../types'
import { theoryGroups } from './groups'

function getQuestionsByIds(questions: Question[], ids: string[]): Question[] {
  const byId = new Map(questions.map((q) => [String(q.id), q]))
  return ids.map((id) => byId.get(id)).filter((q): q is Question => Boolean(q))
}

const TheoryGroup = () => {
  const { id: groupId } = useParams<'id'>()
  const { content } = useAppState()

  if (content.loading) {
    return <TopicPlaceholder />
  }

  const group = theoryGroups.find((g) => g.id === groupId)

  if (!group) {
    return <p>Раздел не найден</p>
  }

  const questions = getQuestionsByIds(content.questions, group.questionIds)

  return <Questions questions={questions} title={group.name} prevLink={routes.theory.path} />
}

export default TheoryGroup
