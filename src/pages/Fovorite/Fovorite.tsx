import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import CleanFavorites from '../../components/CleanButtons/CleanFavorites';
import FavoriteQuestions from '../../components/FavoriteQuestions/FavoriteQuestions';
import { useCleaned } from '../../hooks/useCleaned';
import { routes } from '../../router/constants';
import { BaseData, Group, Question } from '../../types';

const getQuestionsByGroupId = (questions: Question[], groupId: string) => {
  return questions.filter((question) => question.gid === groupId);
};

const Favorite: React.FC = () => {
  const { t } = useTranslation();
  const { id: topicId } = useParams<'id'>();
  const [state, setState] = useState<{
    questions: Question[];
    groupName: Group['name'];
  }>({
    questions: [],
    groupName: '',
  });
  const [loading, setLoading] = useState<boolean>(true);
  const { onCleaned } = useCleaned();

  useEffect(() => {
    import('././../../data/ru.json')
      .then((data) => {
        if (topicId) {
          const questions = getQuestionsByGroupId(data.questions, topicId);
          const groupName = data.groups.find((group) => group.id === topicId)?.name;

          if (groupName) {
            setState({
              questions,
              groupName,
            });
          }
        } else {
          setState({
            questions: data.questions,
            groupName: '',
          });
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [topicId]);

  const title = topicId ? `${t('favorite')}: ${state.groupName}` : t('favorite');
  const prevLink = topicId ? routes.topics.path : routes.home.path;

  return loading ? (
    <>loading</>
  ) : (
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
