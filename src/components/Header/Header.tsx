import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { PiList } from 'react-icons/pi'
import { CiDark } from 'react-icons/ci'
import { MdOutlineWbSunny } from 'react-icons/md'
import Menu from '../Menu/Menu'
import { useAppSettings } from '../../contexts/AppSettingsContext/AppSettingsContext'
import s from './Header.module.scss'

const Header: FC = () => {
  const { theme, toggleTheme } = useAppSettings()
  const [open, setOpen] = useState(false)

  const toggleMenu = (newOpen: boolean) => () => {
    setOpen(newOpen)
  }

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
              <span>ПДД</span> 2026
            </h1>
          </Link>
        </div>

        <div className={s.right}>
          <div className='theme-btn' onClick={toggleTheme}>
            {theme === 'dark' ? (
              <>
                <MdOutlineWbSunny size={14} /> Светлая тема
              </>
            ) : (
              <>
                <CiDark size={14} /> Темная тема
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
