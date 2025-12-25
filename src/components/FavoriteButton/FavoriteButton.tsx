import React, { useEffect, useState } from 'react'

import { FavoriteStore } from '../../services/FavoriteStore'
import { QuestionId } from '../../types'

import { PiStarFill, PiStarLight } from 'react-icons/pi'
import { useTranslation } from 'react-i18next'

interface Props {
  questionId: QuestionId
  addButton?: boolean
}

const FavoriteButton: React.FC<Props> = ({ questionId, addButton = true }) => {
  const { t } = useTranslation()
  const [hasInFavorite, setHasInFavorite] = useState(FavoriteStore.hasQuestionIdInFavorites(questionId))

  useEffect(() => {
    setHasInFavorite(FavoriteStore.hasQuestionIdInFavorites(questionId))
  }, [questionId])

  const handleAddToFavoriteClick = () => {
    setHasInFavorite(true)
    FavoriteStore.addQuestionIdToFavorites(questionId)
    window.dispatchEvent(new Event('storage'))
  }

  const handleRemoveFromFavoriteClick = () => {
    setHasInFavorite(false)
    FavoriteStore.removeQuestionIdFromFavorites(questionId)
    window.dispatchEvent(new Event('storage'))
  }

  return hasInFavorite ? (
    <button className='favorite-btn' onClick={handleRemoveFromFavoriteClick}>
      <PiStarFill size={20} /> {t('removeFromFavorite')}
    </button>
  ) : (
    <>
      {addButton && (
        <button className='favorite-btn' onClick={handleAddToFavoriteClick}>
          <PiStarLight size={20} /> {t('addToFavorite')}
        </button>
      )}
    </>
  )
}

export default FavoriteButton
