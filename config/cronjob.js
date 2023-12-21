const cron = require('node-cron');

cron.schedule('*/5 * * * * *', () => {
    console.log('Last live data retrieved from MQTT broker: ' + new Date());

});