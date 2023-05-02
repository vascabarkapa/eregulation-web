import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import MyProfileModal from 'src/app/shared/components/MyProfileModal';

function UserMenu(props) {
  const [openProfile, setOpenProfile] = useState(false);
  const [userMenu, setUserMenu] = useState(null);

  const userMenuClick = (event) => {
    setUserMenu(event.currentTarget);
  };

  const handleMyProfileModal = () => {
    setOpenProfile(true);
    setUserMenu(null);
  };

  const userMenuClose = () => {
    setUserMenu(null);
  };

  return (
    <>
      <Button
        className="min-h-40 min-w-40 px-16 py-0 md:py-6"
        onClick={userMenuClick}
        color="inherit"
      >
        <div className="flex flex-col mx-4 items-end">
          <Typography component="span" className="font-semibold flex">
            Test User
          </Typography>
          <Typography className="text-11 font-medium" color="text.secondary">
            test.user@mail.com
          </Typography>
        </div>
      </Button>

      <Popover
        open={Boolean(userMenu)}
        anchorEl={userMenu}
        onClose={userMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        classes={{
          paper: 'py-8',
        }}
      >
        <>
          <MenuItem onClick={handleMyProfileModal} role="button">
            <ListItemIcon className="min-w-40">
              <FuseSvgIcon>heroicons-outline:user-circle</FuseSvgIcon>
            </ListItemIcon>
            <ListItemText primary="My Profile" />
          </MenuItem>
          <MenuItem
            component={NavLink}
            to="/sign-out"
            onClick={() => {
              userMenuClose();
            }}
          >
            <ListItemIcon className="min-w-40">
              <FuseSvgIcon>heroicons-outline:logout</FuseSvgIcon>
            </ListItemIcon>
            <ListItemText primary="Sign out" />
          </MenuItem>
        </>
      </Popover>
      {openProfile && <MyProfileModal open={openProfile} setOpen={setOpenProfile} />}
    </>
  );
}

export default UserMenu;
