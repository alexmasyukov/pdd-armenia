import clsx from 'clsx';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { PiListBold } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import s from './Header.module.scss';

const Header: FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
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

        <img src={`${process.env.PUBLIC_URL}/images/flag-my.png`} alt='' />

        <h1>
          <span>ПДД</span> 2023
        </h1>
      </div>

      <div className={s.right}>
        <button onClick={() => changeLanguage('ru')} className={clsx({ [s.active]: i18n.language === 'ru' })}>
          Рус
        </button>
        <button onClick={() => changeLanguage('am')} className={clsx({ [s.active]: i18n.language === 'am' })}>
          Հայ
        </button>

        <PiListBold size={20} className={s['menu-btn']} />
      </div>
    </header>
  );
};

export default Header;
