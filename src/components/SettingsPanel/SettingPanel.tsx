import Switch from '@mui/material/Switch'
import Button from '../../components/Button/Button'
import { useAppState } from '../../contexts/AppStateContext/AppStateContext'

const SettingsPanel = () => {
  const { showRightAnswers, changeShowRightAnswersFlag } = useAppState()

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
      Отображать правильные ответы
    </Button>
  )
}

export default SettingsPanel
