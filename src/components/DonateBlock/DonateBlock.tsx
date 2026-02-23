import { PiHandHeartLight } from 'react-icons/pi'
import MuiLink from '@mui/material/Link'
import s from './DonateBlock.module.scss'

const DonateBlock = () => {
  return (
    <div className={s.block}>
      <PiHandHeartLight size={28} className={s.icon} />
      <p className={s.text}>
        <b>Хотите поддержать проект?</b>
        <br />
        Сделайте донат в проверенную группу помощи животным{' '}
        <MuiLink
          href='https://www.facebook.com/profile.php?id=100057275926542'
          target='_blank'
          rel='noreferrer'
          underline='always'
          color='inherit'
        >
          <b>CAToo</b>
        </MuiLink>{' '}
        — Cat Rescue Armenia
      </p>
    </div>
  )
}

export default DonateBlock
