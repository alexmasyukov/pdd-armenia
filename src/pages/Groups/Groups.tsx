import React from 'react';
import FavoriteQuestions from './../../components/FavoriteQuestions/FavoriteQuestions';
import Questions from './../../components/Questions/Qustions';
import { questions_ru } from './../../data/questions';

const Groups: React.FC = () => {
  return (
    <>
      <Questions questions={questions_ru} />

      <br />
      <h3>Избранное</h3>
      <FavoriteQuestions questions={questions_ru} />
    </>
  );
};

export default Groups;
