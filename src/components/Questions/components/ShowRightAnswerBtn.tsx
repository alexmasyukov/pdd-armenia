import { PiMagicWandLight } from 'react-icons/pi'

type Props = {
  onClick: () => void
}

const ShowRightAnswerBtn = ({ onClick }: Props) => {
  return (
    <div className={'favorite-btn report-btn'} onClick={onClick}>
      <PiMagicWandLight size={16} /> Показать ответ
    </div>
  )
}

export default ShowRightAnswerBtn
