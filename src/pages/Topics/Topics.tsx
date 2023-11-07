import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Grid from '@mui/material/Grid';
import { getEmptyBaseData } from '../../helpers';
import { routes } from '../../router/constants';
import { BaseData, Group } from '../../types';
import s from './Topics.module.scss';

const getQestionCount = (groupId: Group['id'], allQestions: BaseData['questions']) => {
  return allQestions.filter(({ gid }) => gid === groupId).length;
};

const Topics: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState<BaseData>(getEmptyBaseData());
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    import('././../../data/ru.json').then((data) => {
      setData(data as BaseData);
      setLoading(false);
    });
  }, []);

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
      {data.groups.map((group, index) => (
        <React.Fragment key={group.id}>
          <Grid container spacing={1} className={s.topics}>
            <Grid item xs={9} sm={10} md={11}>
              <Link to={routes.topics.topicById.view(group.id)}>{group.name}</Link>
            </Grid>
            <Grid item xs={3} sm={2} md={1} textAlign={'right'}>
              <div className={s.count}>
                <div>
                  <span>0</span>
                  {' '}/{' '}
                  <span>0</span>
                </div>
                <div>{getQestionCount(group.id, data.questions)}</div>
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className={s.progress}></div>
            </Grid>
            {index !== data.groups.length - 1 && (
              <Grid item xs={12}>
                <div className={s.hr} />
              </Grid>
            )}
          </Grid>
        </React.Fragment>
      ))}
    </>
  );
};

export default Topics;
