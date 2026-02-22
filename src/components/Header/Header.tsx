import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { PiList } from 'react-icons/pi'
import { CiDark } from 'react-icons/ci'
import { MdOutlineWbSunny } from 'react-icons/md'
import Menu from '../Menu/Menu'
import { useAppSettings } from '../../contexts/AppSettingsContext/AppSettingsContext'
import s from './Header.module.scss'

const Header: FC = () => {
  const { t } = useTranslation()
  const { theme, toggleTheme } = useAppSettings()
  const [open, setOpen] = useState(false)

  const toggleMenu = (newOpen: boolean) => () => {
    setOpen(newOpen)
  }

  // const changeLanguage = (lng: string) => {
  //   localStorage.setItem('lang', lng);
  //   i18n.changeLanguage(lng);
  // };

  const handleMenuClick = () => {
    setOpen(true)
  }

  return (
    <>
      <Menu open={open} toggleMenu={toggleMenu} />

      <header className={s.header}>
        <div className={s.left}>
          <Link to='/'>
            <img src={`${process.env.PUBLIC_URL}/images/flag.png`} alt='' />

            <h1>
              <span>{t('pdd')}</span> 2026
            </h1>
          </Link>
        </div>

        <div className={s.right}>
          {/* <span
            onClick={() => changeLanguage('ru')}
            className={clsx(s['lang-btn'], clsx({ [s.active]: i18n.language === 'ru' }))}
          >
            Рус
          </span>
          <span
            onClick={() => changeLanguage('am')}
            className={clsx(s['lang-btn'], { [s.active]: i18n.language === 'am' })}
          >
            Հայ
          </span> */}

          <div className='theme-btn' onClick={toggleTheme}>
            {theme === 'dark' ? (
              <>
                <MdOutlineWbSunny size={14} /> {t('lightTheme')}
              </>
            ) : (
              <>
                <CiDark size={14} /> {t('darkTheme')}
              </>
            )}
          </div>

          <div className={s['menu-btn']} onClick={handleMenuClick}>
            <PiList size={22} />
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
