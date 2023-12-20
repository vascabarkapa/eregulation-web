function getModeValue(mode) {
    switch (mode) {
        case 0:
            return 'OFF';
        case 1:
            return 'ON';
        case 2:
            return 'AUTO';
        default:
            return 'N/A';
    }
}

const LightDataHelper = {
    getModeValue
}

export default LightDataHelper;