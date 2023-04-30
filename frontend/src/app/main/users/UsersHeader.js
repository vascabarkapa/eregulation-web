import * as React from 'react';
import { Button, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon/FuseSvgIcon';

export default function UsersPage() {
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
                    Users
                </Typography>
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
                    className="mx-16"
                >
                    <Button
                        size="large"
                        component={Link}
                        to="#"
                        variant="contained"
                        color="secondary"
                        startIcon={<FuseSvgIcon>heroicons-outline:plus</FuseSvgIcon>}
                    >
                        Add User
                    </Button>
                </motion.div>
            </div>
        </>

    );
}