import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { memo } from 'react';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import DateTimeHelper from 'src/app/shared/helpers/DateTimeHelper';
import { motion } from 'framer-motion';
import { Tooltip } from '@mui/material';

function HumidityLive() {
    const { date } = { date: '2023-05-01T22:24:15.000Z' };

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
        >
            <Paper className="relative flex flex-col flex-auto p-24 pr-12 pb-12 rounded-2xl shadow overflow-hidden">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <Typography className="text-3xl font-bold" variant="h1">
                            Current Humidity
                        </Typography>
                        <Typography className="text-green-600 font-medium text-sm">Last Update in {DateTimeHelper.convertToLocalFormatWithSeconds(date)}</Typography>

                    </div>
                    <div className="-mt-8">
                        <Tooltip title="Refresh" placement="top">
                            <IconButton size="large">
                                <FuseSvgIcon>material-outline:refresh</FuseSvgIcon>
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>
                <div className="flex flex-col flex-wrap mt-16">
                    <div className="flex items-center">
                        <div className="h-16 w-16 bg-red-500 rounded-full animate-ping mr-32"></div>
                        <Typography className="text-9xl font-extrabold" variant="h1">
                            48%
                        </Typography>
                    </div>
                </div>
                <div className="absolute bottom-0 ltr:right-0 rtl:left-0 w-96 h-96 -m-24">
                    <FuseSvgIcon size={100} className="opacity-25 text-white-400">
                        material-outline:water_drop
                    </FuseSvgIcon>
                </div>
            </Paper>
        </motion.div>
    );
}

export default memo(HumidityLive);
