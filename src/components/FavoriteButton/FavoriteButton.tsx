import React, { useEffect, useState } from 'react';

import { FavoriteStore } from '../../services/FavoriteStore';
import { QuestionId } from '../../types';

import { PiStarFill } from 'react-icons/pi';
import { PiStar } from 'react-icons/pi';

interface Props {
  questionId: QuestionId;
}

const FavoriteButton: React.FC<Props> = ({ questionId }) => {
  const [hasInFavorite, setHasInFavorite] = useState(FavoriteStore.hasQuestionIdInFavorites(questionId));

  useEffect(() => {
    setHasInFavorite(FavoriteStore.hasQuestionIdInFavorites(questionId));
  }, [questionId]);

  const handleAddToFavoriteClick = () => {
    setHasInFavorite(true);
    FavoriteStore.addQuestionIdToFavorites(questionId);
    window.dispatchEvent(new Event('storage'));
  };

  const handleRemoveFromFavoriteClick = () => {
    setHasInFavorite(false);
    FavoriteStore.removeQuestionIdFromFavorites(questionId);
    window.dispatchEvent(new Event('storage'));
  };

  return hasInFavorite ? (
    <button className='favorite-btn' onClick={handleRemoveFromFavoriteClick}>
      <PiStarFill size={20} /> Удалить из избранного
    </button>
  ) : (
    <button className='favorite-btn' onClick={handleAddToFavoriteClick}>
      <PiStar size={20} /> Добавить в избранное
    </button>
  );
};

export default FavoriteButton;
