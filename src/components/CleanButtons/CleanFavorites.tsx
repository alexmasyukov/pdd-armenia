import React from 'react'
import { PiStarHalfThin } from 'react-icons/pi'
import { FavoriteStore } from '../../services/FavoriteStore'
import TextButton from '../TextButton/TextButton'

type Props = {
  onCleaned?: () => void
  red?: boolean
  smallIcon?: boolean
}

const CleanFavorites: React.FC<Props> = ({ onCleaned, red, smallIcon }) => {
  const handleCleanFavorites = () => {
    if (window.confirm('Вы уверены, что хотите очистить избранное?')) {
      FavoriteStore.cleanFavorites()
      // This is needed to update the FavoriteQuestions component
      window.dispatchEvent(new Event('storage'))
      onCleaned && onCleaned()
    }
  }

  return (
    <TextButton
      color={red ? 'red' : 'gray'}
      variant='small'
      icon={PiStarHalfThin}
      iconProps={{
        size: smallIcon ? 17 : 20,
      }}
      onClick={handleCleanFavorites}
    >
      Очистить избранное
    </TextButton>
  )
}

export default CleanFavorites
