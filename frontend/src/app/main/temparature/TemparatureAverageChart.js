import Paper from '@mui/material/Paper';
import { lighten, useTheme } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { memo, useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import Box from '@mui/material/Box';
import { motion } from 'framer-motion';

function TemperatureAverageChart() {
    const theme = useTheme();
    const [awaitRender, setAwaitRender] = useState(true);
    const [tabValue, setTabValue] = useState(0);
    const { overview, series, ranges, labels } = {
        "overview": {
            "this-week": {
                "max-temparature": 28,
                "min-temparature": 12,
                "fixed": 3,
                "wont-fix": 4,
                "re-opened": 8,
                "needs-triage": 6
            },
            "last-week": {
                "max-temparature": 26,
                "min-temparature": 14,
                "fixed": 6,
                "wont-fix": 11,
                "re-opened": 6,
                "needs-triage": 5
            }
        },
        "ranges": {
            "this-week": "This Week",
            "last-week": "Last Week"
        },
        "labels": [
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
            "Sun"
        ],
        "series": {
            "this-week": [
                {
                    "name": "New issues",
                    "type": "line",
                    "data": [
                        42,
                        28,
                        43,
                        34,
                        20,
                        25,
                        22
                    ]
                },
                {
                    "name": "Closed issues",
                    "type": "column",
                    "data": [
                        11,
                        10,
                        8,
                        11,
                        8,
                        10,
                        17
                    ]
                }
            ],
            "last-week": [
                {
                    "name": "New issues",
                    "type": "line",
                    "data": [
                        37,
                        32,
                        39,
                        27,
                        18,
                        24,
                        20
                    ]
                },
                {
                    "name": "Closed issues",
                    "type": "column",
                    "data": [
                        9,
                        8,
                        10,
                        12,
                        7,
                        11,
                        15
                    ]
                }
            ]
        }
    };
    const currentRange = Object.keys(ranges)[tabValue];

    const chartOptions = {
        chart: {
            fontFamily: 'inherit',
            foreColor: 'inherit',
            height: '100%',
            type: 'line',
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: false,
            },
        },
        colors: [theme.palette.primary.main, theme.palette.secondary.main],
        labels,
        dataLabels: {
            enabled: true,
            enabledOnSeries: [0],
            background: {
                borderWidth: 0,
            },
        },
        grid: {
            borderColor: theme.palette.divider,
        },
        legend: {
            show: false,
        },
        plotOptions: {
            bar: {
                columnWidth: '50%',
            },
        },
        states: {
            hover: {
                filter: {
                    type: 'darken',
                    value: 0.75,
                },
            },
        },
        stroke: {
            width: [3, 0],
        },
        tooltip: {
            followCursor: true,
            theme: theme.palette.mode,
        },
        xaxis: {
            axisBorder: {
                show: false,
            },
            axisTicks: {
                color: theme.palette.divider,
            },
            labels: {
                style: {
                    colors: theme.palette.text.secondary,
                },
            },
            tooltip: {
                enabled: false,
            },
        },
        yaxis: {
            labels: {
                offsetX: -16,
                style: {
                    colors: theme.palette.text.secondary,
                },
            },
        },
    };

    useEffect(() => {
        setAwaitRender(false);
    }, []);

    if (awaitRender) {
        return null;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
        >
            <Paper className="flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden">
                <div className="flex flex-col sm:flex-row items-start justify-between">
                    <Typography className="text-lg font-medium tracking-tight leading-6 truncate">
                        Statistical Temperature Data
                    </Typography>
                    <div className="mt-12 sm:mt-0 sm:ml-8">
                        <Tabs
                            value={tabValue}
                            onChange={(ev, value) => setTabValue(value)}
                            indicatorColor="secondary"
                            textColor="inherit"
                            variant="scrollable"
                            scrollButtons={false}
                            className="-mx-4 min-h-40"
                            classes={{ indicator: 'flex justify-center bg-transparent w-full h-full' }}
                            TabIndicatorProps={{
                                children: (
                                    <Box
                                        sx={{ bgcolor: 'text.disabled' }}
                                        className="w-full h-full rounded-full opacity-20"
                                    />
                                ),
                            }}
                        >
                            {Object.entries(ranges).map(([key, label]) => (
                                <Tab
                                    className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
                                    disableRipple
                                    key={key}
                                    label={label}
                                />
                            ))}
                        </Tabs>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 grid-flow-row gap-24 w-full mt-32 sm:mt-16">
                    <div className="flex flex-col flex-auto">
                        <Typography className="font-medium" color="text.secondary">
                            Average Temperature
                        </Typography>
                        <div className="flex flex-col flex-auto">
                            <ReactApexChart
                                className="flex-auto w-full"
                                options={chartOptions}
                                series={series[currentRange]}
                                height={320}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <Typography className="font-medium" color="text.secondary">
                            Overview
                        </Typography>
                        <div className="flex-auto grid grid-cols-4 gap-16 mt-24">
                            <div className="col-span-2 flex flex-col items-center justify-center py-32 px-4 rounded-2xl bg-indigo-50 text-indigo-800">
                                <Typography className="text-5xl sm:text-7xl font-semibold leading-none tracking-tight">
                                    {overview[currentRange]['max-temparature']}&deg;C
                                </Typography>
                                <Typography className="mt-4 text-sm sm:text-lg font-medium">Max Temparature</Typography>
                            </div>
                            <div className="col-span-2 flex flex-col items-center justify-center py-32 px-4 rounded-2xl bg-green-50 text-green-800">
                                <Typography className="text-5xl sm:text-7xl font-semibold leading-none tracking-tight">
                                    {overview[currentRange]['min-temparature']}&deg;C
                                </Typography>
                                <Typography className="mt-4 text-sm sm:text-lg font-medium">Min Temparature</Typography>
                            </div>
                            <Box
                                sx={{
                                    backgroundColor: (_theme) =>
                                        _theme.palette.mode === 'light'
                                            ? lighten(theme.palette.background.default, 0.4)
                                            : lighten(theme.palette.background.default, 0.02),
                                }}
                                className="col-span-2 sm:col-span-1 flex flex-col items-center justify-center py-32 px-4 rounded-2xl"
                            >
                                <Typography className="text-5xl font-semibold leading-none tracking-tight">
                                    {overview[currentRange].fixed}
                                </Typography>
                                <Typography className="mt-4 text-sm font-medium text-center">Fixed</Typography>
                            </Box>
                            <Box
                                sx={{
                                    backgroundColor: (_theme) =>
                                        _theme.palette.mode === 'light'
                                            ? lighten(theme.palette.background.default, 0.4)
                                            : lighten(theme.palette.background.default, 0.02),
                                }}
                                className="col-span-2 sm:col-span-1 flex flex-col items-center justify-center py-32 px-4 rounded-2xl"
                            >
                                <Typography className="text-5xl font-semibold leading-none tracking-tight">
                                    {overview[currentRange]['wont-fix']}
                                </Typography>
                                <Typography className="mt-4 text-sm font-medium text-center">Won't Fix</Typography>
                            </Box>
                            <Box
                                sx={{
                                    backgroundColor: (_theme) =>
                                        _theme.palette.mode === 'light'
                                            ? lighten(theme.palette.background.default, 0.4)
                                            : lighten(theme.palette.background.default, 0.02),
                                }}
                                className="col-span-2 sm:col-span-1 flex flex-col items-center justify-center py-32 px-4 rounded-2xl"
                            >
                                <Typography className="text-5xl font-semibold leading-none tracking-tight">
                                    {overview[currentRange]['re-opened']}
                                </Typography>
                                <Typography className="mt-4 text-sm font-medium text-center">Re-opened</Typography>
                            </Box>
                            <Box
                                sx={{
                                    backgroundColor: (_theme) =>
                                        _theme.palette.mode === 'light'
                                            ? lighten(theme.palette.background.default, 0.4)
                                            : lighten(theme.palette.background.default, 0.02),
                                }}
                                className="col-span-2 sm:col-span-1 flex flex-col items-center justify-center py-32 px-4 rounded-2xl"
                            >
                                <Typography className="text-5xl font-semibold leading-none tracking-tight">
                                    {overview[currentRange]['needs-triage']}
                                </Typography>
                                <Typography className="mt-4 text-sm font-medium text-center">Needs Triage</Typography>
                            </Box>
                        </div>
                    </div>
                </div>
            </Paper>
        </motion.div>
    );
}

export default memo(TemperatureAverageChart);
