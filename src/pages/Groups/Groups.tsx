import React, { useEffect, useState } from 'react';
import { Question } from '../../types';
import FavoriteQuestions from './../../components/FavoriteQuestions/FavoriteQuestions';
import Questions from './../../components/Questions/Qustions';

const Groups: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    import('././../../data/ru.json').then((data) => {
      setQuestions(data.questions as Question[]);
      setLoading(false);
    });
  }, []);

  return loading ? (
    <>Loaing</>
  ) : (
    <>
      <Questions questions={questions} />

      <br />
      <h3>Избранное</h3>
      <FavoriteQuestions questions={questions} />
    </>
  );
};

export default Groups;
