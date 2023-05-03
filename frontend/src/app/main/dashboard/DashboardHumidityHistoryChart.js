import { useTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ReactApexChart from 'react-apexcharts';
import ChartData from 'src/app/shared/components/ChartData';
import { motion } from 'framer-motion';

function DashboardHumidityHistoryChart(props) {
    const theme = useTheme();
    const { series, averageRatio, predictedRatio, overallScore, labels } = ChartData.getHumidityHistoryChartData();

    const chartOptions = {
        chart: {
            animations: {
                enabled: false,
            },
            fontFamily: 'inherit',
            foreColor: 'inherit',
            height: '100%',
            type: 'area',
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: false,
            },
        },
        colors: [theme.palette.primary.light, theme.palette.primary.light],
        dataLabels: {
            enabled: false,
        },
        fill: {
            colors: [theme.palette.primary.dark, theme.palette.primary.light],
            opacity: 0.5,
        },
        grid: {
            show: false,
            padding: {
                bottom: -40,
                left: 0,
                right: 0,
            },
        },
        legend: {
            show: false,
        },
        stroke: {
            curve: 'smooth',
            width: 2,
        },
        tooltip: {
            followCursor: true,
            theme: 'dark',
            x: {
                format: 'MMM dd, yyyy',
            },
        },
        xaxis: {
            axisBorder: {
                show: false,
            },
            labels: {
                offsetY: -20,
                rotate: 0,
                style: {
                    colors: theme.palette.text.secondary,
                },
            },
            tickAmount: 3,
            tooltip: {
                enabled: false,
            },
            type: 'datetime',
        },
        yaxis: {
            labels: {
                style: {
                    colors: theme.palette.divider,
                },
            },
            max: (max) => max + 250,
            min: (min) => min - 250,
            show: false,
            tickAmount: 5,
        },
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
        >
            <Paper className="flex flex-col flex-auto shadow rounded-2xl overflow-hidden">
                <div className="flex items-center justify-between mt-40 ml-40 mr-24 sm:mr-40">
                    <div className="flex flex-col">
                        <Typography className="mr-16 text-2xl md:text-3xl font-semibold tracking-tight leading-7">
                            Humidity Overview
                        </Typography>
                        <Typography className="font-medium" color="text.secondary">
                            Humidity overview by month
                        </Typography>
                    </div>
                </div>
                <div className="flex flex-col flex-auto h-320 mt-12">
                    <ReactApexChart
                        className="flex-auto w-full h-full"
                        options={chartOptions}
                        series={series}
                        type={chartOptions.chart.type}
                        height={chartOptions.chart.height}
                    />
                </div>
            </Paper>
        </motion.div>
    );
}

export default DashboardHumidityHistoryChart;
