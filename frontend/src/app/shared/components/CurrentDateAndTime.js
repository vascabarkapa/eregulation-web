import { Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';

function CurrentDateAndTime() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);

        return () => clearInterval(timer);
    }, []);

    const timeOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
    };

    const dateOptions = {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
    };

    const formattedTime = time.toLocaleString('en-US', timeOptions);
    const formattedDate = time.toLocaleDateString('en-US', dateOptions);

    return (
        <>
            <div>
                <Typography className="text-2xl md:text-5xl font-semibold tracking-tight leading-7 md:leading-snug truncate">
                    {formattedTime}
                </Typography>
            </div>
            <div>
                <div className="flex items-end">
                    <Typography className="mx-6 leading-6 truncate" color="text.secondary">
                        {formattedDate}
                    </Typography>
                </div>
            </div>
        </>
    );
}

export default CurrentDateAndTime;
