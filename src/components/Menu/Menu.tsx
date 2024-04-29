import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MenuList from '@mui/material/MenuList';
// import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {
  PiDotsNineBold,
  PiStarLight,
  PiWarningLight,
  PiBookBookmarkLight,
  PiClockCountdownLight,
} from 'react-icons/pi';
import { styled } from '@mui/system';
import { routes } from '../../router/constants';

const Icon = styled(ListItemIcon)({
  minWidth: '36px',
});

type Props = {
  open: boolean;
  toggleMenu: (newOpen: boolean) => () => void;
};

const Menu = ({ open, toggleMenu }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const DrawerList = (
    <Box sx={{ width: 250 }} role='presentation' onClick={toggleMenu(false)}>
      <MenuList>
        {/* <Divider /> */}

        <MenuItem disablePadding>
          <ListItemButton onClick={() => navigate(routes.home.path)}>
            <Icon>
              <PiDotsNineBold size={20} />
            </Icon>
            <ListItemText>{t('home')}</ListItemText>
          </ListItemButton>
        </MenuItem>

        <MenuItem disablePadding>
          <ListItemButton onClick={() => navigate(routes.topics.path)}>
            <Icon>
              <PiBookBookmarkLight size={20} />
            </Icon>
            <ListItemText>{t('topics')}</ListItemText>
          </ListItemButton>
        </MenuItem>

        <MenuItem disablePadding>
          <ListItemButton onClick={() => navigate(routes.favorite.path)}>
            <Icon>
              <PiStarLight size={20} />
            </Icon>
            <ListItemText>{t('favorite')}</ListItemText>
          </ListItemButton>
        </MenuItem>

        <MenuItem disablePadding>
          <ListItemButton onClick={() => navigate(routes.errors.path)}>
            <Icon>
              <PiWarningLight size={20} />
            </Icon>
            <ListItemText>{t('errors')}</ListItemText>
          </ListItemButton>
        </MenuItem>

        <MenuItem disablePadding disabled>
          <ListItemButton>
            <Icon>
              <PiClockCountdownLight size={20} />
            </Icon>
            <ListItemText>{t('exam')}</ListItemText>
          </ListItemButton>
        </MenuItem>

        {/* <Divider /> */}
      </MenuList>
    </Box>
  );

  return (
    <Drawer anchor={'right'} open={open} onClose={toggleMenu(false)}>
      {DrawerList}
    </Drawer>
  );
};

export default Menu;
