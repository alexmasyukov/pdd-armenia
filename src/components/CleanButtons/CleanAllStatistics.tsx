import React from 'react';
import { useTranslation } from 'react-i18next';
import { PiKnifeThin } from 'react-icons/pi';
import { Language } from '../../enums';
import { StatisticsStore } from '../../services/StatisticsStore';
import TextButton from '../TextButton/TextButton';

type Props = {
  onCleaned?: () => void;
};

const CleanAllStatistics: React.FC<Props> = ({ onCleaned }) => {
  const { t, i18n } = useTranslation();

  const handleCleanAllStatistics = () => {
    if (window.confirm(t('clean-all-statistics-confirm'))) {
      StatisticsStore.cleanAllStatistics(i18n.language as Language);
      onCleaned && onCleaned();
    }
  };

  return (
    <TextButton color='gray' variant='small' icon={PiKnifeThin} onClick={handleCleanAllStatistics}>
      {t('clean-all-statistics')}
    </TextButton>
  );
};

export default CleanAllStatistics;
