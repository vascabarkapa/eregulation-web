import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { memo } from 'react';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { Tooltip } from '@mui/material';

function DashboardTemperatureLive() {
    return (
        <Paper>
            <div class="flex flex-row">
                <div class="w-1/3 md:flex justify-center items-center hidden">
                    <FuseSvgIcon size={'40%'} className="animate-ping">heroicons-outline:sun</FuseSvgIcon>
                </div>
                <div class="md:w-2/3 w-full">
                    <div class="flex flex-col shadow rounded-2xl overflow-hidden">
                        <Paper className="flex flex-col shadow rounded-2xl overflow-hidden">
                            <div className="flex items-center justify-center px-8 pt-12">
                                <Typography className="mr-16 text-2xl md:text-3xl font-semibold tracking-tight text-center leading-7">
                                    Current Temperature
                                </Typography>
                            </div>
                            <div className="text-center mt-20">
                                <Typography className="text-7xl sm:text-9xl font-bold tracking-tight leading-none">
                                    28&deg;C
                                </Typography>
                            </div>
                            <div className="flex items-center justify-between px-8 pt-12">
                                <Typography className="mr-16 text-sm md:text-md font-medium tracking-tight leading-7 text-green-600">
                                    Last update: 04/22/2023 03:03:15 AM
                                </Typography>
                                <Tooltip title="Refresh" placement="top">
                                    <IconButton size="large">
                                        <FuseSvgIcon>material-outline:refresh</FuseSvgIcon>
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </Paper>
                    </div>
                </div>
            </div>
        </Paper>
    );
}

export default memo(DashboardTemperatureLive);
