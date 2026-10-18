import { PiWarningCircleFill } from 'react-icons/pi'
import MuiLink from '@mui/material/Link'
import s from './DatabaseOutdatedBlock.module.scss'

const DatabaseOutdatedBlock = () => {
  return (
    <div className={s['outdated-block']}>
      <PiWarningCircleFill size={28} />
      <span>
        <span className={s['title']}>Внимание!</span>
        База вопросов станет не актуальна с 02.11.2026, в связи с обновлением базы дорожной полиции РА.
        <br />
        Подробнее{' '}
        <MuiLink href='https://haywiki.org/drive/license.html' target='_blank' rel='noreferrer' underline='always'>
          здесь
        </MuiLink>
        .
      </span>
    </div>
  )
}

export default DatabaseOutdatedBlock
