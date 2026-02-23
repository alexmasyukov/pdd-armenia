import s from './TelegramButton.module.scss'

const TelegramButton = () => {
  return (
    <div
      className={s.btn}
      onClick={() => window.open('https://t.me/am_autoclub', '_blank', 'noreferrer')}
    >
      <img
        src={`${process.env.PUBLIC_URL}/telegram-svgrepo-com.svg`}
        alt='Telegram'
        className={s.icon}
      />
      <span className={s.text}>Автомобилисты<br />в Армении</span>
    </div>
  )
}

export default TelegramButton
