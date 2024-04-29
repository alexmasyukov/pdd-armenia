import Switch from '@mui/material/Switch';
import { useTranslation } from 'react-i18next';
import Button from '../../components/Button/Button';
import { useAppState } from '../../contexts/AppStateContext/AppStateContext';

const SettingsPanel = () => {
  const { t } = useTranslation();
  const { showRightAnswers, changeShowRightAnswersFlag } = useAppState();

  return (
    <Button gray smallFont>
      <Switch checked={showRightAnswers} size='small' color='warning' onChange={changeShowRightAnswersFlag} />
      {t('showRightAnswers')}
    </Button>
  );
};

export default SettingsPanel;
