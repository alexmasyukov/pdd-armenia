import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PiWarningLight } from 'react-icons/pi'
import { FaTelegram } from 'react-icons/fa6'
import { Question } from '../../types'

type Props = {
  questionId: Question['id']
  group: string | undefined
}

async function copyContent({ questionId, group }: Props) {
  try {
    await navigator.clipboard.writeText(`Вопрос: ${questionId}\nГруппа: ${group}\nОшибка: `)
    console.log('Content copied to clipboard')
  } catch (err) {
    console.error('Failed to copy: ', err)
  }
}

const ReportBtn = ({ questionId, group }: Props) => {
  const { t } = useTranslation()
  const [showMessage, setShowMessage] = useState(true)

  useEffect(() => {
    setShowMessage(false)
  }, [questionId, group])

  return (
    <>
      <div
        className={`favorite-btn report-btn ${showMessage ? 'active' : ''}`}
        onClick={() => setShowMessage((prev) => !prev)}
      >
        <PiWarningLight size={16} /> {t('report')}
      </div>
      {showMessage && (
        <div className='report'>
          <p className='title'>
            <FaTelegram size={16} /> Пожалуйста, отправьте это соощение в Telegram канал <br />{' '}
            <a href='https://t.me/armeniaTrafficLawsApp' target='_blank' rel='noreferrer'>
              @armeniaTrafficLawsApp
            </a>{' '}
            с вашим описанием ошибки:
          </p>
          <div>
            –––
            <br />
            Вопрос: {questionId}
            <br />
            Группа: {group}
            <br />
            Ошибка:
          </div>

          <button
            onClick={() =>
              copyContent({
                questionId,
                group,
              })
            }
          >
            {t('copy-message')}
          </button>
        </div>
      )}
    </>
  )
}

export default ReportBtn
