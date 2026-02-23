import { PiSealCheckLight } from 'react-icons/pi'
import { VERIFICATION_DATE } from '../../config/verificationConfig'
import s from './QuestionVerifiedBlock.module.scss'

const QuestionVerifiedBlock = () => {
  return (
    <div className={`check-status-btn ${s['verified-block']}`}>
      <PiSealCheckLight fontSize={20} />
      <span>
        Проверено в <a
          href='https://police.am/%D5%BE%D5%A1%D6%80%D5%B8%D6%80%D5%A4%D5%A1%D5%AF%D5%A1%D5%B6-%D5%A5%D5%BE-%D5%A5%D6%80%D5%A9%D5%A5%D5%BE%D5%A5%D5%AF%D5%B8%D6%82%D5%A9%D5%B5%D5%A1%D5%B6-%D5%BF%D5%A5%D5%B2%D5%A5%D5%AF%D5%A1%D5%BF%D5%B8%D6%82/the-list-of-driving-theory-test-questions.html'
          target='_blank'
          rel='noreferrer'
        >официальных источниках</a> Дорожной Полиции РА <br /> – {VERIFICATION_DATE}
      </span>
    </div>
  )
}

export default QuestionVerifiedBlock
