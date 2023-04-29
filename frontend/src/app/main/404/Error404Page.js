import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

function Error404Page() {
  const navigaton = useNavigate();

  const handleDashboard = () => {
    navigaton('/dashboard');
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center p-16">
      <div className="w-full max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
        >
          <Typography
            variant="h1"
            className="text-4xl md:text-7xl font-extrabold tracking-tight leading-tight md:leading-none text-center"
          >
            404 | Not Found
          </Typography>
          <Button
            className="whitespace-nowrap font-extrabold mt-10 md:mt-20 text-lg md:text-xl"
            variant="text"
            color="secondary"
            onClick={handleDashboard}
          >
            Back to Dashboard
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

export default Error404Page;
