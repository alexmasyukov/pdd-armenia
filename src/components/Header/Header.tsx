import clsx from 'clsx';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { PiListLight } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import s from './Header.module.scss';

const Header: FC = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    localStorage.setItem('lang', lng);
    i18n.changeLanguage(lng);
  };

  return (
    <header className={s.header}>
      <div className={s.left}>
        {/* <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/groups'>Groups</Link>
          </li>
        </ul>
      </nav> */}

        {/* <img src={`${process.env.PUBLIC_URL}/images/flag-my.png`} alt='' /> */}
        <Link to='/'>
          <img src={`${process.env.PUBLIC_URL}/images/flag.png`} alt='' />
        </Link>
        {/* <img src={`${process.env.PUBLIC_URL}/images/wa1.png`} alt='' /> */}
        {/* <div className={s.logo}>
          <div />
          <div />
        </div> */}

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

        <PiListLight size={22} className={s['menu-btn']} />
      </div>
    </header>
  );
};

export default Header;
