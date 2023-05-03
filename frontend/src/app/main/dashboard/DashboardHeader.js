import Typography from '@mui/material/Typography';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useEffect, useState } from 'react';
import CurrentDateAndTime from '../../shared/components/CurrentDateAndTime';
import { motion } from 'framer-motion';


function DashboardHeader(props) {
  const date = new Date();
  const hours = date.getHours();

  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    if (hours >= 3 && hours < 12) {
      setGreeting("Good morning, Test User");
    } else if (hours >= 12 && hours < 17) {
      setGreeting("Good afternoon, Test User");
    } else {
      setGreeting("Good evening, Test User");
    }
  }, [])

  return (
    <div className="flex flex-col w-full px-24 sm:px-32">
      <div className="flex flex-col sm:flex-row flex-auto sm:items-center min-w-0 my-32 sm:my-48">
        <div className="flex flex-auto items-center min-w-0">
          <div className="flex flex-col min-w-0 mx-16">
            <Typography className="text-2xl md:text-5xl font-semibold tracking-tight leading-7 md:leading-snug truncate"
              component={motion.span}
              initial={{ x: -20 }}
              animate={{ x: 0, transition: { delay: 0.2 } }}
              delay={300}
            >
              {greeting}
            </Typography>

            <motion.div
              initial={{ x: -20 }}
              animate={{ x: 0, transition: { delay: 0.2 } }}
            >
              <div className="flex items-center">
                <FuseSvgIcon size={20} color="action">
                  heroicons-outline:chip
                </FuseSvgIcon>
                <Typography className="mx-6 leading-6" color="text.secondary">
                  Take control of your surroundings with eRegulation
                </Typography>
              </div>
            </motion.div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
        >
          <div className="flex items-center mt-24 sm:mt-0 sm:mx-8 space-x-12 mx-16">
            <CurrentDateAndTime />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default DashboardHeader;
