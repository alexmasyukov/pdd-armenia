import { PiSealCheckLight } from 'react-icons/pi'
import MuiLink from '@mui/material/Link'
import { VERIFICATION_DATE } from '../../config/verificationConfig'
import s from './QuestionVerifiedBlock.module.scss'

interface Props {
  noMarginTop?: boolean
  blue?: boolean
}

const QuestionVerifiedBlock = ({ noMarginTop, blue }: Props) => {
  return (
    <div
      className={`check-status-btn ${s['verified-block']} ${noMarginTop ? s['no-margin-top'] : ''} ${blue ? s['blue'] : ''}`}
    >
      <PiSealCheckLight size={28} />
      <span>
        В приложении были использованы экзаменационные вопросы из{' '}
        <MuiLink
          href='https://roadpolice.am/ru/viv-exam'
          target='_blank'
          rel='noreferrer'
          underline='always'
          color={blue ? undefined : 'inherit'}
        >
          официального источника
        </MuiLink>
        , сайта Дорожной Полиции Республики Армения, {VERIFICATION_DATE}.
        {blue && (
          <>
            <br />
            <br />
            Экзаменационные вопросы валидированы на основе PDF файлов{' '}
            <MuiLink
              href={`${process.env.PUBLIC_URL}/pdd-questions-armenia-ru-08-2026.zip`}
              underline='always'
            >
              (архив от {VERIFICATION_DATE})
            </MuiLink>
          </>
        )}
      </span>
    </div>
  )
}

export default QuestionVerifiedBlock
