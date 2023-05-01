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
                    <Typography
                        variant="h1"
                        className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight md:leading-none text-center mb-10"
                        color="secondary"
                    >
                        Take control of your surroundings with eRegulation.
                    </Typography>
                    <Typography
                        variant="h1"
                        className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight md:leading-none text-center mb-96"
                    >
                        Your smart solution for sensor regulation.
                    </Typography>
                    <img className="mx-auto w-3/5 sm:w-2/5 animate-pulse" src="assets/images/logo/eregulation-light.svg" alt="logo" />
                    <Typography
                        variant="h1"
                        className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight md:leading-none text-center mt-96"
                    >
                        Available for every mobile device
                    </Typography>
                    <div className="flex flex-col lg:flex-row mt-20 md:mt-32">
                        <div className="lg:w-1/2 mb-20 md:mb-0">
                            <Typography
                                variant="h7"
                                className="text-center font-bold"
                            >
                                The application can be downloaded via Google Play
                            </Typography>
                            <a href="https://play.google.com/" target="_blank">
                                <img className="w-3/6 mt-10 mx-auto cursor-pointer" src="assets/images/badges/google_play_badge.png" />
                            </a>
                        </div>
                        <div className="lg:w-1/2">
                            <Typography
                                variant="h7"
                                className="text-center font-bold"
                            >
                                The application can be downloaded via App Store
                            </Typography>
                            <a href="https://www.apple.com/app-store/" target="_blank">
                                <img className="w-3/6 mt-10 mx-auto cursor-pointer" src="assets/images/badges/app_store_badge.png" />
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>

        </div>
    );
}

export default AboutPage;
