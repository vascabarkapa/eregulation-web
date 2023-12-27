function parseLiveMessageToJson(receivedMessage) {
    const regex = /^t-([\d.]+)-h-([\d.]+)-l-([\d.]+)$/;

    const match = receivedMessage.match(regex);
    const temperature = parseFloat(match[1]).toFixed(2);
    const humidity = parseFloat(match[2]).toFixed(2);
    const light = parseInt(match[3]);

    return [
        {type: "t", value: temperature},
        {type: "h", value: humidity},
        {type: "l", value: light}
    ];
}

module.exports = parseLiveMessageToJson;