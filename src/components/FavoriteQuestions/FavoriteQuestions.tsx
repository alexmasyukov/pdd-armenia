import React, { useEffect, useState } from 'react';
import { FavoriteStore } from '../../services/FavoriteStore';
import { Question } from '../../types';
import Questions from '../Questions/Questions';

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
      setFavoriteQuestions(getFavotiteQuestions(questions));
    };

    window.addEventListener('storage', onStorageEvent, false);

    return () => {
      window.removeEventListener('storage', onStorageEvent, false);
    };
  }, []);

  return <Questions questions={favoriteQuestions} favoriteAddButton={false} />;
};

export default FavoriteQuestions;
