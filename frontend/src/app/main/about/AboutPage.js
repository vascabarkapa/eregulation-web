import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';

function AboutPage() {
    return (
        <div className="flex flex-col flex-1 items-center justify-center p-16">
            <div className="w-full max-w-6xl text-center mb-72 sm:mb-20">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
                >
                    <img className="mx-auto w-3/5 sm:w-2/5 mb-20 animate-pulse" src="assets/images/logo/eregulation-light.svg" alt="logo" />
                    <Typography
                        variant="h1"
                        className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight md:leading-none text-center mb-10"
                        color="secondary"
                    >
                        Take control of your surroundings with eRegulation.
                    </Typography>
                    <Typography
                        variant="h1"
                        className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight md:leading-none text-center"
                    >
                        Your smart solution for sensor regulation.
                    </Typography>
                </motion.div>

            </div>
            <Typography
                variant="h7"
                className="fixed bottom-0 p-4 pb-20 text-center font-bold"
            >
                University of East Sarajevo, Faculty of Electrical Engineering &copy; 2023
            </Typography>
        </div>
    );
}

export default AboutPage;
