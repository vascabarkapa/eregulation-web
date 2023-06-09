import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { styled, ThemeProvider, useTheme } from '@mui/material/styles';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import clsx from 'clsx';
import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FuseNavigation from '@fuse/core/FuseNavigation';
import { navbarCloseMobile } from 'app/store/fuse/navbarSlice';
import { selectContrastMainTheme } from 'app/store/fuse/settingsSlice';
import { useLocation } from 'react-router-dom';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { selectNavigation } from 'app/store/fuse/navigationSlice';
import UserNavbarMenu from 'app/theme-layouts/shared-components/UserNavbarMenu';

const Root = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
}));

function needsToBeOpened(location, item) {
  return location.pathname === item.url;
}

function NavbarStyle3Content(props) {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const navigation = useSelector(selectNavigation);
  const [selectedNavigation, setSelectedNavigation] = useState([]);
  const [panelOpen, setPanelOpen] = useState(false);
  const theme = useTheme();
  const dispatch = useDispatch();
  const contrastTheme = useSelector(selectContrastMainTheme(theme.palette.primary.main));
  const location = useLocation();

  useEffect(() => {
    navigation?.forEach((item) => {
      if (needsToBeOpened(location, item)) {
        setSelectedNavigation([item]);
      }
    });
  }, []);

  useEffect(() => {
    navigation?.forEach((item) => {
      if (needsToBeOpened(location, item)) {
        setSelectedNavigation([item]);
      }
    });
  }, [navigation, location]);

  function handleParentItemClick(selected) {
    setPanelOpen(false);
    if (isMobile) {
      dispatch(navbarCloseMobile());
    }
  }

  return (
    <ClickAwayListener onClickAway={() => setPanelOpen(false)}>
      <Root className={clsx('flex flex-auto flex h-full', props.className)}>
        <ThemeProvider theme={contrastTheme}>
          <div id="fuse-navbar-side-panel" className="flex shrink-0 flex-col items-center">
            <img className="w-80 my-32 cursor-pointer" src="assets/images/logo/eregulation-light.svg" alt="logo"
              onClick={() => window.location.href = "/"}
            />

            <FuseScrollbars
              className="flex flex-1 min-h-0 justify-center w-full overflow-y-auto overflow-x-hidden"
              option={{ suppressScrollX: true, wheelPropagation: false }}
            >
              <FuseNavigation
                className={clsx('navigation')}
                navigation={navigation}
                layout="vertical-2"
                onItemClick={handleParentItemClick}
                firstLevel
                selectedId={selectedNavigation[0]?.id}
                dense={props.dense}
              />
            </FuseScrollbars>
            <UserNavbarMenu />
          </div>
        </ThemeProvider>
      </Root>
    </ClickAwayListener>
  );
}

export default memo(NavbarStyle3Content);
