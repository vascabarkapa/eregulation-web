function getTemperatureHistoryChartData(temperatureHistoryData) {
    return {
        "ranges": {
            "last-24-hours": "Last 24 hours",
        },
        "series": {
            "last-24-hours": [
                {
                    "name": "Temperature",
                    "data": temperatureHistoryData
                }
            ],
        }
    };
}

function getHumidityHistoryChartData(humidityHistoryData) {
    return {
        "ranges": {
            "last-24-hours": "Last 24 hours",
        },
        "series": {
            "last-24-hours": [
                {
                    "name": "Humidity",
                    "data": humidityHistoryData
                }
            ],
        }
    };
}

function getTemperatureAverageChartData() {
    return {
        "overview": {
            "this-week": {
                "max-temperature": 28,
                "min-temperature": 12,
                "fixed": 3,
                "wont-fix": 4,
                "re-opened": 8,
                "needs-triage": 6
            },
            "last-week": {
                "max-temperature": 26,
                "min-temperature": 14,
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
}

function getHumidityAverageChartData() {
    return {
        "overview": {
            "this-week": {
                "max-humidity": 28,
                "min-humidity": 12,
                "fixed": 3,
                "wont-fix": 4,
                "re-opened": 8,
                "needs-triage": 6
            },
            "last-week": {
                "max-humidity": 26,
                "min-humidity": 14,
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
}

const ChartData = {
    getTemperatureHistoryChartData,
    getHumidityHistoryChartData,
    getTemperatureAverageChartData,
    getHumidityAverageChartData
}

export default ChartData;