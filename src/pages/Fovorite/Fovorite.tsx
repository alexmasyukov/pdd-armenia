import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import CleanFavorites from '../../components/CleanButtons/CleanFavorites';
import FavoriteQuestions from '../../components/FavoriteQuestions/FavoriteQuestions';
import { useAppState } from '../../contexts/AppStateContext/AppStateContext';
import { useCleaned } from '../../hooks/useCleaned';
import TopicPlaceholder from '../../placeholders/TopicPlaceholder';
import { routes } from '../../router/constants';
import { Group, Question } from '../../types';

const getQuestionsByGroupId = (questions: Question[], groupId: string) => {
  return questions.filter((question) => question.gid === groupId);
};

const Favorite: React.FC = () => {
  const { t } = useTranslation();
  const { id: topicId } = useParams<'id'>();
  const { content } = useAppState();
  const { onCleaned } = useCleaned();

  const [state, setState] = useState<{
    questions: Question[];
    groupName: Group['name'];
  }>({
    questions: [],
    groupName: '',
  });

  useEffect(() => {
    if (!content.loading && content.groups.length > 0 && content.questions.length > 0) {
      if (topicId) {
        const questions = getQuestionsByGroupId(content.questions, topicId);
        const groupName = content.groups.find((group) => group.id === topicId)?.name;

        if (groupName) {
          setState({
            questions,
            groupName,
          });
        }
      } else {
        setState({
          questions: content.questions,
          groupName: '',
        });
      }
    }
  }, [content.loading, topicId, content]);

  const title = topicId ? `${t('favorite')}: ${state.groupName}` : t('favorite');
  const prevLink = topicId ? routes.topics.path : routes.home.path;

  if (content.loading) {
    return <TopicPlaceholder />;
  }

  return (
    <>
      {state.questions.length > 0 ? (
        <FavoriteQuestions questions={state.questions} title={title} prevLink={prevLink} />
      ) : (
        <p>В избранном нет вопросов</p>
      )}

      <Grid container spacing={1}>
        <Grid item xs={12} display='flex' justifyContent='flex-end'>
          <CleanFavorites onCleaned={onCleaned} />
        </Grid>
      </Grid>
    </>
  );
};

export default Favorite;
