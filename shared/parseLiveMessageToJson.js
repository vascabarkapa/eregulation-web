function parseLiveMessageToJson(receivedMessage) {
    const regex = /^t-(\d+)-h-(\d+)-l-(\d+)$/;

    const match = receivedMessage.match(regex);
    const temperature = parseInt(match[1], 10);
    const humidity = parseInt(match[2], 10);
    const light = parseInt(match[3], 10);

    return [
        {type: "t", value: temperature},
        {type: "h", value: humidity},
        {type: "l", value: light}
    ];
}

module.exports = parseLiveMessageToJson;