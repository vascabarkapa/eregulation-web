import { useSelector } from 'react-redux';
import { styled, ThemeProvider, useTheme } from '@mui/material/styles';
import ReactApexChart from 'react-apexcharts';
import { useState } from 'react';
import { selectContrastMainTheme } from 'app/store/fuse/settingsSlice';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ChartData from 'src/app/shared/components/ChartData';
import { motion } from 'framer-motion';
import DateTimeHelper from "../../../shared/helpers/DateTimeHelper";


const Root = styled(Paper)(({ theme }) => ({
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
}));

function DashboardTemperatureHistoryChart({temperatureHistoryData}) {
    const theme = useTheme();
    const contrastTheme = useSelector(selectContrastMainTheme(theme.palette.primary.main));
    const { series, ranges } = ChartData.getTemperatureHistoryChartData(temperatureHistoryData);
    const [tabValue, setTabValue] = useState(0);
    const currentRange = Object.keys(ranges)[tabValue];

    const chartOptions = {
        chart: {
            animations: {
                speed: 400,
                animateGradually: {
                    enabled: false,
                },
            },
            fontFamily: 'inherit',
            foreColor: 'inherit',
            width: '100%',
            height: '100%',
            type: 'area',
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: false,
            },
        },
        colors: [contrastTheme.palette.secondary.light],
        dataLabels: {
            enabled: false,
        },
        fill: {
            colors: [contrastTheme.palette.secondary.dark],
        },
        grid: {
            show: false,
            borderColor: contrastTheme.palette.divider,
            padding: {
                top: 10,
                bottom: -40,
                left: 0,
                right: -40,
            },
            position: 'back',
            xaxis: {
                lines: {
                    show: true,
                },
            },
        },
        stroke: {
            width: 2,
        },
        tooltip: {
            followCursor: true,
            theme: 'dark',
            y: {
                formatter: (value) => `${value}&deg;C`,
            },
        },
        xaxis: {
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            crosshairs: {
                stroke: {
                    color: contrastTheme.palette.divider,
                    dashArray: 0,
                    width: 2,
                },
            },
            labels: {
                offsetY: -20,
                style: {
                    colors: contrastTheme.palette.text.secondary,
                },
                formatter: (value) => `${DateTimeHelper.getTimeWithSeconds(value)}`,
                rotate: 0
            },
            tickAmount: 10,
            tooltip: {
                enabled: false,
            },
        },
        yaxis: {
            axisTicks: {
                show: false,
            },
            axisBorder: {
                show: false,
            },
            min: 0,
            max: (max) => max,
            tickAmount: 5,
            show: false,
        },
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
        >
            <ThemeProvider theme={contrastTheme}>
                <Root className="sm:col-span-2 lg:col-span-3 dark flex flex-col flex-auto shadow rounded-2xl">
                    <div className="flex items-center justify-between mt-40 ml-40 mr-24 sm:mr-40">
                        <div className="flex flex-col">
                            <Typography className="mr-16 text-2xl md:text-3xl font-semibold tracking-tight leading-7">
                                Temperature Overview
                            </Typography>
                            <Typography className="font-medium" color="text.secondary">
                                Measurement data in the last 24 hours
                            </Typography>
                        </div>
                    </div>

                    <div className="flex flex-col flex-auto h-320">
                        <ReactApexChart
                            options={chartOptions}
                            series={series[currentRange]}
                            type={chartOptions.chart.type}
                            height={chartOptions.chart.height}
                        />
                    </div>
                </Root>
            </ThemeProvider>
        </motion.div>
    );
}

export default DashboardTemperatureHistoryChart;
