import { PiEyeLight, PiEyeSlashLight } from 'react-icons/pi';
import { useSettings } from '../../contexts/SettingsContext/SettingsContext';

const ShowRightAnswersBtn = () => {
  const { showRightAnswers, changeShowRightAnswersFlag } = useSettings();

  return (
    <div
      className={`favorite-btn report-btn show-right-answer-btn ${showRightAnswers && 'active'}`}
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
  );
};

export default ShowRightAnswersBtn;
