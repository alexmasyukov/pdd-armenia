import { FC } from 'react';
import { Link } from 'react-router-dom';

const Header: FC = () => (
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
  </header>
);

export default Header;
