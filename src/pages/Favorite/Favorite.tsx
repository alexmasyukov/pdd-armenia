import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { Grid } from '@mui/material'
import CleanFavorites from '../../components/CleanButtons/CleanFavorites'
import FavoriteQuestions from '../../components/FavoriteQuestions/FavoriteQuestions'
import { useAppState } from '../../contexts/AppStateContext/AppStateContext'
import { useCleaned } from '../../hooks/useCleaned'
import TopicPlaceholder from '../../placeholders/TopicPlaceholder'
import { routes } from '../../router/constants'
import { Group, Question } from '../../types'
import { useFirebase } from '../../contexts/FirebaseContext'
import { getQuestionsByGroupIdsAndFavoriteIds } from '../../helpers'
import { FavoriteStore } from '../../services/FavoriteStore'

const getQuestionsByGroupId = (questions: Question[], groupId: string) => {
  return questions.filter((question) => question.gid === groupId)
}

const Favorite: React.FC = () => {
  const { t } = useTranslation()
  const { id: topicId } = useParams<'id'>()
  const { content } = useAppState()
  const { onCleaned } = useCleaned()
  const { fetchGroup } = useFirebase()

  const [state, setState] = useState<{
    questions: Question[]
    groupName: Group['name']
  }>({
    questions: [],
    groupName: '',
  })

  useEffect(() => {
    if (!content.loading && content.groups.length > 0 && content.questions.length > 0) {
      if (topicId) {
        let questions: Question[] = []
        let groupName: string | undefined = undefined

        if (topicId?.length > 10) {
          // is firebase group id
          const getGroup = async () => {
            const fetchedGroup = await fetchGroup(topicId!)

            if (fetchedGroup) {
              setState({
                questions: getQuestionsByGroupIdsAndFavoriteIds(
                  content.questions,
                  fetchedGroup.questionIds.map((q) => Number(q)),
                  FavoriteStore.getFavorites()
                ),
                groupName: fetchedGroup.name,
              })
            }
          }

          getGroup()
        } else {
          questions = getQuestionsByGroupId(content.questions, topicId)
          groupName = content.groups.find((group) => group.id === topicId)?.name

          if (groupName) {
            setState({
              questions,
              groupName,
            })
          }
        }
      } else {
        setState({
          questions: content.questions,
          groupName: '',
        })
      }
    }
  }, [content.loading, topicId, content])

  const title = topicId ? `${t('favorite')}: ${state.groupName}` : t('favorite')
  const prevLink = topicId ? routes.detailedTopics.path : routes.home.path

  if (content.loading) {
    return <TopicPlaceholder />
  }

  return (
    <>
      {state.questions.length > 0 ? (
        <FavoriteQuestions questions={state.questions} title={title} prevLink={prevLink} />
      ) : (
        <p>В избранном нет вопросов</p>
      )}

      <Grid container spacing={1}>
        <Grid item xs={12} mt={1.1}>
          <CleanFavorites red smallIcon onCleaned={onCleaned} />
        </Grid>
      </Grid>
    </>
  )
}

export default Favorite
