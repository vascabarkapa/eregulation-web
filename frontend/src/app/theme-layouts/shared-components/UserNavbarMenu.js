import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import styled from 'styled-components';
import MyProfileModal from 'src/app/shared/components/MyProfileModal';

const CustomButton = styled(Button)`
  &:hover {
    border-radius: 12px;
  }
`;

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
            <CustomButton
                className="my-24 mx-10 py-32 hidden lg:flex"
                onClick={userMenuClick}
                color="inherit"
            >
                <div className="flex flex-col mx-4 items-center">
                    <Typography component="span" className="font-semibold flex">
                        Test User
                    </Typography>

                </div>
            </CustomButton>

            <Popover
                open={Boolean(userMenu)}
                anchorEl={userMenu}
                onClose={userMenuClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'bottom',
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
