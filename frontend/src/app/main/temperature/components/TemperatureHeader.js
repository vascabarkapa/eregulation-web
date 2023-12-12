import * as React from 'react';
import { Typography } from '@mui/material';
import { motion } from 'framer-motion';

const TemperatureHeader = () => {
    return (
        <>
            <div className="flex flex-col sm:flex-row space-y-16 sm:space-y-0 w-full items-center justify-between py-32  px-24 sm:px-32">
                <Typography
                    component={motion.span}
                    initial={{ x: -20 }}
                    animate={{ x: 0, transition: { delay: 0.2 } }}
                    delay={300}
                    className="text-24 md:text-32 font-extrabold tracking-tight mx-16"
                >
                    Temperature
                </Typography>
            </div>
        </>

    );
}

export default TemperatureHeader;