import React, { useEffect, useState } from 'react';
import { FavoriteStore } from '../../services/FavoriteStore';
import { Question } from '../../types';
import Questions from '../Questions/Qustions';

interface Props {
  questions: Question[];
}

const getFavotiteQuestions = (questions: Question[]) => {
  const favoriteQuestionIds = FavoriteStore.getFavorites();
  return questions.filter((question) => favoriteQuestionIds.includes(question.id));
};

const FavoriteQuestions: React.FC<Props> = ({ questions }) => {
  const [favoriteQuestions, setFavoriteQuestions] = useState(getFavotiteQuestions(questions));

  useEffect(() => {
    const onStorageEvent = () => {
      setTimeout(() => {
        setFavoriteQuestions(getFavotiteQuestions(questions));
      }, 200);
    };

    window.addEventListener('storage', onStorageEvent, false);

    return () => {
      window.removeEventListener('storage', onStorageEvent, false);
    };
  }, []);

  return <Questions questions={favoriteQuestions} favoriteButtonVisible={false} />;
};

export default FavoriteQuestions;
