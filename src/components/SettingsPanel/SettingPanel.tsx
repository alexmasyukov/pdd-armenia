import Switch from '@mui/material/Switch';
import { useTranslation } from 'react-i18next';
import Button from '../../components/Button/Button';
import { useAppState } from '../../contexts/AppStateContext/AppStateContext';

const SettingsPanel = () => {
  const { t } = useTranslation();
  const { showRightAnswers, changeShowRightAnswersFlag } = useAppState();

  return (
    <Button
      smallFont
      style={{
        background: 'var(--settings-bg)',
        justifyContent: 'flex-start',
        padding: '0 15px',
      }}
    >
      <Switch checked={showRightAnswers} size='small' color='info' onChange={changeShowRightAnswersFlag} />
      {t('showRightAnswers')}
    </Button>
  );
};

export default SettingsPanel;
