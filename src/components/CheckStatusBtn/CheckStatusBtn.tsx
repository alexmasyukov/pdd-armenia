import LoadingButton from '@mui/lab/LoadingButton'
import { PiSealCheckLight, PiSealWarningLight } from 'react-icons/pi'
import Box from '@mui/material/Box'

type Props = {
  lastCheckedDate: string | undefined
  onClick: () => void
  label: string
  loading?: boolean
  disabled?: boolean
}

const CheckStatusBtn = ({ lastCheckedDate, onClick, label, loading, disabled }: Props) => {
  let initialLabel = disabled ? <>в официальных источниках Дорожной Полиции РА</> : label

  const content = lastCheckedDate ? (
    <>
      <PiSealCheckLight fontSize={20} />
      {disabled ? '' : '  '} Проверено {initialLabel} {disabled && <br />} – {lastCheckedDate}
    </>
  ) : (
    <>
      <PiSealWarningLight fontSize={20} />
      {disabled ? '' : '  '} Не проверено {initialLabel}
    </>
  )

  if (disabled) {
    return <Box className='check-status-btn'>{content}</Box>
  }

  return (
    <>
      <LoadingButton
        disabled={loading || disabled}
        loading={loading}
        onClick={onClick}
        variant='outlined'
        size='small'
        color={lastCheckedDate ? 'info' : 'secondary'}
      >
        {content}
      </LoadingButton>
    </>
  )
}

export default CheckStatusBtn
