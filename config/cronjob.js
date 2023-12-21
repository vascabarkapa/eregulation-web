const axios = require('axios');
const cron = require('node-cron');
const dotenv = require("dotenv").config();

cron.schedule('*/30 * * * * *', () => {
    getLatestData();
});

function getLatestData() {
    axios.get(process.env.API_URL + 'data/latest')
        .then((response) => {
            console.log('Last live data retrieved from MQTT broker: ' + new Date());
        })
        .catch((error) => {
            console.error('Error calling API:', error.message);
        });
}
