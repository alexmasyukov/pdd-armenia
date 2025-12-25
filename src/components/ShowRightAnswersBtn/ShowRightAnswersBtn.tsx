import { PiEyeLight, PiEyeSlashLight } from 'react-icons/pi'
import { useAppState } from '../../contexts/AppStateContext/AppStateContext'

type Props = {
  style?: React.CSSProperties
}

const ShowRightAnswersBtn = ({ style }: Props) => {
  const { showRightAnswers, changeShowRightAnswersFlag } = useAppState()

  return (
    <div
      className={`favorite-btn report-btn show-right-answer-btn ${showRightAnswers && 'active'}`}
      style={style}
      onClick={changeShowRightAnswersFlag}
    >
      {showRightAnswers ? (
        <>
          <PiEyeSlashLight size={16} /> Не отображать правильные ответы
        </>
      ) : (
        <>
          <PiEyeLight size={16} /> Отображать правильные ответы
        </>
      )}
    </div>
  )
}

export default ShowRightAnswersBtn
