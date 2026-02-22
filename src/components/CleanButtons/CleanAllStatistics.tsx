import React from 'react'
import { PiKnifeThin } from 'react-icons/pi'
import { Language } from '../../enums'
import { StatisticsStore } from '../../services/StatisticsStore'
import TextButton from '../TextButton/TextButton'

type Props = {
  onCleaned?: () => void
}

const CleanAllStatistics: React.FC<Props> = ({ onCleaned }) => {
  const handleCleanAllStatistics = () => {
    if (window.confirm('Вы уверены, что хотите полностью очистить статистику?')) {
      StatisticsStore.cleanAllStatistics(Language.Russian)
      // This is needed to update the FavoriteQuestions component
      window.dispatchEvent(new Event('storage'))
      onCleaned && onCleaned()
    }
  }

  return (
    <TextButton color='gray' variant='small' icon={PiKnifeThin} onClick={handleCleanAllStatistics}>
      Очистить статистику
    </TextButton>
  )
}

export default CleanAllStatistics
