import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Grid from '@mui/material/Grid';
import { getEmptyBaseData, getQuestionStatisticsFromStorage } from '../../helpers';
import { routes } from '../../router/constants';
import { BaseData, Group, QuestionStatisticsByLanguage } from '../../types';
import s from './Topics.module.scss';
import { QuestionStatus } from '../../enums';

const getQestionCount = (groupId: Group['id'], allQestions: BaseData['questions']) => {
  return allQestions.filter(({ gid }) => gid === groupId).length;
};

const getStatisticsByGroup = (
  groupId: Group['id'],
  data: BaseData,
  questionStatistics: QuestionStatisticsByLanguage
) => {
  const questionIds = data.questions.filter(({ gid }) => gid === groupId).map(({ id }) => id);
  const result = questionIds.reduce(
    (acc, id) => {
      if (questionStatistics[id] === QuestionStatus.Correct) {
        acc.correct += 1;
      }

      if (questionStatistics[id] === QuestionStatus.Wrong) {
        acc.wrong += 1;
      }

      return acc;
    },
    {
      correct: 0,
      wrong: 0,
    }
  );

  return result;
};

const Topics: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [data, setData] = useState<BaseData>(getEmptyBaseData());
  const [loading, setLoading] = useState<boolean>(true);
  const questionStatistics = getQuestionStatisticsFromStorage(i18n.language);

  useEffect(() => {
    import('././../../data/ru.json').then((data) => {
      setData(data as BaseData);
      setLoading(false);
    });
  }, []);

  const handleNavigateToTopic = (groupId: Group['id']) => () => {
    navigate(routes.topics.topicById.view(groupId));
  };

  return loading ? (
    <>Loaing</>
  ) : (
    <>
      <Grid container className={s.topicsTitle}>
        <Grid item xs={9} sm={10} md={11}>
          {t('topic')}
        </Grid>
        <Grid item xs={3} sm={2} md={1} textAlign={'right'}>
          <div className={s.count}>
            <div>{t('solved')}</div>
            <div>{t('total')}</div>
          </div>
        </Grid>
      </Grid>
      {data.groups.map((group, index) => {
        const groupStatistics = getStatisticsByGroup(group.id, data, questionStatistics);

        return (
          <React.Fragment key={group.id}>
            <Grid
              container
              spacing={1}
              mb={2}
              mt={index === 0 ? 2 : 0}
              onClick={handleNavigateToTopic(group.id)}
              className={s.topic}
            >
              <Grid item xs={9} sm={10} md={11}>
                <Link to={routes.topics.topicById.view(group.id)}>{group.name}</Link>
              </Grid>
              <Grid item xs={3} sm={2} md={1} textAlign={'right'}>
                <div className={s.count}>
                  <div>
                    <span>{groupStatistics.correct}</span>
                    {' '}/{' '}
                    <span>{groupStatistics.wrong}</span>
                  </div>
                  <div>{getQestionCount(group.id, data.questions)}</div>
                </div>
              </Grid>
              <Grid item xs={12}>
                <div className={s.progress}></div>
              </Grid>
            </Grid>

            <Grid container mb={1}>
              {index !== data.groups.length - 1 && (
                <Grid item xs={12}>
                  <div className={s.hr} />
                </Grid>
              )}
            </Grid>
          </React.Fragment>
        );
      })}
    </>
  );
};

export default Topics;
