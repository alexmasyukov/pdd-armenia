import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Header: FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/groups'>Groups</Link>
          </li>
        </ul>
      </nav>

      <button type='button' onClick={() => changeLanguage('ru')}>
        ru
      </button>
      <button type='button' onClick={() => changeLanguage('am')}>
        am
      </button>
    </header>
  );
};

export default Header;
