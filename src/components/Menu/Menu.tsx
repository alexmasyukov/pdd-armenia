import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import MenuList from '@mui/material/MenuList'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import {
  PiBookBookmarkLight,
  PiClockCountdownLight,
  PiDotsNineBold,
  PiStarLight,
  PiWarningLight,
} from 'react-icons/pi'
import { styled } from '@mui/system'
import { routes } from '../../router/constants'
import { Badge } from '@mui/material'
import { FavoriteStore } from '../../services/FavoriteStore'
import ShowRightAnswersBtn from '../ShowRightAnswersBtn/ShowRightAnswersBtn'
import { useAppState } from '../../contexts/AppStateContext/AppStateContext'
import { getQuestionsHasErrors } from '../../pages/Errors/helpers'

const Icon = styled(ListItemIcon)({
  minWidth: '36px',
})

type Props = {
  open: boolean
  toggleMenu: (newOpen: boolean) => () => void
}

const Menu = ({ open, toggleMenu }: Props) => {
  const navigate = useNavigate()
  const { content } = useAppState()
  const errorsCount = content.loading ? 0 : getQuestionsHasErrors(content.questions).length

  const DrawerList = (
    <Box sx={{ width: 250 }} role='presentation' onClick={toggleMenu(false)}>
      <MenuList>
        <MenuItem disablePadding>
          <ListItemButton onClick={() => navigate(routes.home.path)}>
            <Icon>
              <PiDotsNineBold size={20} />
            </Icon>
            <ListItemText>Главная</ListItemText>
          </ListItemButton>
        </MenuItem>

        <MenuItem disablePadding>
          <ListItemButton onClick={() => navigate(routes.topics.path)}>
            <Icon>
              <PiBookBookmarkLight size={20} />
            </Icon>
            <ListItemText>Темы</ListItemText>
          </ListItemButton>
        </MenuItem>

        <MenuItem disablePadding>
          <ListItemButton onClick={() => navigate(routes.favorite.path)}>
            <Icon>
              <PiStarLight size={20} />
            </Icon>
            <ListItemText>
              Избранное
              <Badge
                badgeContent={FavoriteStore.getFavorites().length}
                color='warning'
                sx={{ ml: 3 }}
                max={10000}
              />
            </ListItemText>
          </ListItemButton>
        </MenuItem>

        <MenuItem disablePadding>
          <ListItemButton onClick={() => navigate(routes.errors.path)}>
            <Icon>
              <PiWarningLight size={20} />
            </Icon>
            <ListItemText>
              Ошибки
              <Badge
                badgeContent={errorsCount}
                color='warning'
                sx={{ ml: 3 }}
                max={10000}
              />
            </ListItemText>
          </ListItemButton>
        </MenuItem>

        <MenuItem disablePadding disabled>
          <ListItemButton>
            <Icon>
              <PiClockCountdownLight size={20} />
            </Icon>
            <ListItemText>Экзамен</ListItemText>
          </ListItemButton>
        </MenuItem>

        <Divider />

        <MenuItem disablePadding>
          <ShowRightAnswersBtn
            style={{
              margin: '15px 10px',
              paddingLeft: '8px',
            }}
          />
        </MenuItem>
      </MenuList>
    </Box>
  )

  return (
    <Drawer anchor={'right'} open={open} onClose={toggleMenu(false)}>
      {DrawerList}
    </Drawer>
  )
}

export default Menu
