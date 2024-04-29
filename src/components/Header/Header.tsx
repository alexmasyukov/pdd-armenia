import clsx from 'clsx';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PiListLight } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import Menu from '../Menu/Menu';
import s from './Header.module.scss';

const Header: FC = () => {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const toggleMenu = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const changeLanguage = (lng: string) => {
    localStorage.setItem('lang', lng);
    i18n.changeLanguage(lng);
  };

  const handleMenuClick = () => {
    setOpen(true);
  };

  return (
    <>
      <Menu open={open} toggleMenu={toggleMenu} />
      <header className={s.header}>
        <div className={s.left}>
          <Link to='/'>
            <img src={`${process.env.PUBLIC_URL}/images/flag.png`} alt='' />
          </Link>

          <h1>
            <span>{t('pdd')}</span> 2024
          </h1>
        </div>

        <div className={s.right}>
          <span
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
          </span>

          <div onClick={handleMenuClick}>
            <PiListLight size={22} className={s['menu-btn']} />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
