import { memo } from 'react';
import Box from '@mui/material/Box';

function FuseSplashScreen() {
  return (
    <div id="fuse-splash-screen">
      <div className="logo">
        <img width="128" src="assets/images/logo/eregulation-light.svg" alt="logo" />
      </div>
      <Box
        id="spinner"
        sx={{
          '& > div': {
            backgroundColor: 'palette.secondary.main',
          },
        }}
      >
      </Box>
    </div>
  );
}

export default memo(FuseSplashScreen);
