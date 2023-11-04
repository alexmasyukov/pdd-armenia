import React, { useEffect, useState } from 'react';
import FavoriteQuestions from '../../components/FavoriteQuestions/FavoriteQuestions';
import { Question } from '../../types';

const Favorite: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
    </>
  );
};

export default Favorite;
