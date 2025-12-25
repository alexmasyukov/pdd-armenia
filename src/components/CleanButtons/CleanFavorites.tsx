import React from 'react'
import { useTranslation } from 'react-i18next'
import { PiStarHalfThin } from 'react-icons/pi'
import { FavoriteStore } from '../../services/FavoriteStore'
import TextButton from '../TextButton/TextButton'

type Props = {
  onCleaned?: () => void
  red?: boolean
  smallIcon?: boolean
}

const CleanFavorites: React.FC<Props> = ({ onCleaned, red, smallIcon }) => {
  const { t } = useTranslation()

  const handleCleanFavorites = () => {
    if (window.confirm(t('clean-favorites-confirm'))) {
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
      {t('clean-favorites')}
    </TextButton>
  )
}

export default CleanFavorites
