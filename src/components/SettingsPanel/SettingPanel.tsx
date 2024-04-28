import Switch from '@mui/material/Switch';
import { useTranslation } from 'react-i18next';
import Button from '../../components/Button/Button';
import { useSettings } from '../../contexts/SettingsContext/SettingsContext';

const SettingsPanel = () => {
  const { t } = useTranslation();
  const { showRightAnswers, changeShowRightAnswersFlag } = useSettings();

  return (
    <Button gray smallFont>
      <Switch checked={showRightAnswers} size='small' onChange={changeShowRightAnswersFlag} />
      {t('showRightAnswers')}
    </Button>
  );
};

export default SettingsPanel;
