import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import {memo} from 'react';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import {Tooltip} from '@mui/material';
import {motion} from 'framer-motion';
import DateTimeHelper from "../../../shared/helpers/DateTimeHelper";

const DashboardHumidityLive = ({liveHumidity}) => {
    return (
        <motion.div
            initial={{opacity: 0, y: 40}}
            animate={{opacity: 1, y: 0, transition: {delay: 0.2}}}
        >
            <Paper>
                <div class="flex flex-row">
                    <div class="w-1/3 md:flex justify-center items-center hidden">
                        <FuseSvgIcon size={'40%'} className="animate-ping">material-outline:water_drop</FuseSvgIcon>
                    </div>
                    <div class="md:w-2/3 w-full">
                        <div class="flex flex-col shadow rounded-2xl">
                            <Paper className="flex flex-col shadow rounded-2xl">
                                <div className="flex items-center justify-center px-8 pt-12">
                                    <Typography
                                        className="text-2xl md:text-3xl font-semibold tracking-tight text-center leading-7">
                                        Current Humidity
                                    </Typography>
                                </div>
                                <div className="text-center mt-20">
                                    <Typography className="text-7xl sm:text-9xl font-bold tracking-tight leading-none">
                                        {liveHumidity?.value}%
                                    </Typography>
                                </div>
                                <div className="flex items-center justify-between px-8 pt-12">
                                    <Typography
                                        className="mr-16 text-sm md:text-md font-medium tracking-tight leading-7 text-green-600">
                                        Last
                                        Update: {DateTimeHelper.convertToLocalFormatWithSeconds(liveHumidity?.createdAt)}
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
        </motion.div>
    );
}

export default memo(DashboardHumidityLive);
