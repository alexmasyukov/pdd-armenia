import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PiWarningFill } from 'react-icons/pi'
import { routes } from '../../router/constants'

interface Props {
  count: number
  topicId: string
}

const IsErrorLink: React.FC<Props> = ({ count = 0, topicId }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(routes.topicErrors.errorsByTopicId.view(topicId))
  }

  return (
    <button className='favorite-btn is-errors-btn mt0' onClick={handleClick}>
      <PiWarningFill size={14} /> {count}
    </button>
  )
}

export default IsErrorLink
