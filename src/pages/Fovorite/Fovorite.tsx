import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CleanFavorites from '../../components/CleanButtons/CleanFavorites';
import FavoriteQuestions from '../../components/FavoriteQuestions/FavoriteQuestions';
import { useCleaned } from '../../hooks/s';
import { Question } from '../../types';

const Favorite: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { onCleaned } = useCleaned();

  useEffect(() => {
    import('././../../data/ru.json').then((data) => {
      setQuestions(data.questions as Question[]);
      setLoading(false);
    });
  }, []);

  return loading ? (
    <>loading</>
  ) : (
    <>
      <h1>Избранное</h1>
      {questions.length > 0 ? <FavoriteQuestions questions={questions} /> : <p>В избранном нет вопросов</p>}

      <Grid container spacing={1}>
        <Grid item xs={12} display='flex' justifyContent='flex-end'>
          <CleanFavorites onCleaned={onCleaned} />
        </Grid>
      </Grid>
    </>
  );
};

export default Favorite;
