import React from 'react';
import { useTranslation } from 'react-i18next';
import { PiStarHalfThin } from 'react-icons/pi';
import { FavoriteStore } from '../../services/FavoriteStore';
import TextButton from '../TextButton/TextButton';

type Props = {
  onCleaned?: () => void;
};

const CleanFavorites: React.FC<Props> = ({ onCleaned }) => {
  const { t } = useTranslation();

  const handleCleanFavorites = () => {
    if (window.confirm(t('clean-favorites-confirm'))) {
      FavoriteStore.cleanFavorites();
      // This is needed to update the FavoriteQuestions component
      window.dispatchEvent(new Event('storage'));
      onCleaned && onCleaned();
    }
  };

  return (
    <TextButton color='gray' variant='small' icon={PiStarHalfThin} onClick={handleCleanFavorites}>
      {t('clean-favorites')}
    </TextButton>
  );
};

export default CleanFavorites;
