import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { memo } from 'react';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import DateTimeHelper from 'src/app/shared/helpers/DateTimeHelper';

function TemparatureLive() {
    const { date, limit, spent, minimum } = { date: '2023-05-01T22:24:15.000Z', limit: 12, spent: 10, minimum: 5 };

    return (
        <Paper className="relative flex flex-col flex-auto p-24 pr-12 pb-12 rounded-2xl shadow overflow-hidden">
            <div className="flex items-center justify-between">
                <div className="flex flex-col">
                    <Typography className="text-3xl font-bold" variant="h1">
                        Current Temparature
                    </Typography>
                    <Typography className="text-green-600 font-medium text-sm">Last Update in {DateTimeHelper.convertToLocalFormatWithSeconds(date)}</Typography>

                </div>
                <div className="-mt-8">
                    <IconButton aria-label="more" size="large">
                        <FuseSvgIcon>material-outline:refresh</FuseSvgIcon>
                    </IconButton>
                </div>
            </div>
            <div className="flex flex-col flex-wrap mt-16">
                <div className="flex items-center">
                    <div className="h-16 w-16 bg-red-500 rounded-full animate-ping mr-32"></div>
                    <Typography className="text-9xl font-extrabold" variant="h1">
                        25&deg;C
                    </Typography>
                </div>
            </div>
            <div className="absolute bottom-0 ltr:right-0 rtl:left-0 w-96 h-96 -m-24">
                <FuseSvgIcon size={96} className="opacity-25 text-white-400">
                    heroicons-outline:sun
                </FuseSvgIcon>
            </div>
        </Paper>
    );
}

export default memo(TemparatureLive);
