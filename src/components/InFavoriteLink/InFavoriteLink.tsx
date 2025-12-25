import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PiStarFill } from 'react-icons/pi'
import { routes } from '../../router/constants'

interface Props {
  count: number
  topicId: string
}

const InFavoriteLink: React.FC<Props> = ({ count = 0, topicId }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(routes.favorite.favoritesByTopicId.view(topicId))
  }

  return (
    <button className='favorite-btn in-favorite-btn mt0' onClick={handleClick}>
      <PiStarFill size={14} /> {count}
    </button>
  )
}

export default InFavoriteLink
