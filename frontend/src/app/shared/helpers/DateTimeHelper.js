function convertToLocalFormatWithSeconds(dateTime) {
    const dateObj = new Date(dateTime);

    // Format date in 24-hour format
    const hours = dateObj.getHours().toString().padStart(2, '0');
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    const seconds = dateObj.getSeconds().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    // Format date in DD.MM.YYYY format
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObj.getFullYear();
    const formattedDate = `${day}.${month}.${year}`;

    return formattedDate + " " + formattedTime;
}

function convertToLocalFormat(dateTime) {
    const dateObj = new Date(dateTime);

    // Format date in 24-hour format
    const hours = dateObj.getHours().toString().padStart(2, '0');
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}h`;

    // Format date in DD.MM.YYYY format
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObj.getFullYear();
    const formattedDate = `${day}.${month}.${year}`;

    return formattedDate + " " + formattedTime;
}

const DateTimeHelper = {
    convertToLocalFormatWithSeconds,
    convertToLocalFormat
}

export default DateTimeHelper;