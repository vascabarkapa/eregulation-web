function convertToLocalFormatWithSeconds(dateTime) {
    const date = new Date(dateTime);

    const month = date.getMonth() + 1; // getMonth() returns 0-based month, so add 1
    const day = date.getDate();
    const year = date.getFullYear();

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const ampm = hours >= 12 ? 'PM' : 'AM';

    const formattedHours = hours % 12 === 0 ? 12 : hours % 12; // convert 24-hour to 12-hour format
    const paddedMonth = month.toString().padStart(2, '0'); // pad month with leading zero if needed
    const paddedDay = day.toString().padStart(2, '0'); // pad day with leading zero if needed

    return `${paddedMonth}/${paddedDay}/${year} ${formattedHours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${ampm}`;
}

function convertToLocalFormat(dateTime) {
    const date = new Date(dateTime);

    const month = date.getMonth() + 1; // getMonth() returns 0-based month, so add 1
    const day = date.getDate();
    const year = date.getFullYear();

    const hours = date.getHours();
    const minutes = date.getMinutes();

    const ampm = hours >= 12 ? 'PM' : 'AM';

    const formattedHours = hours % 12 === 0 ? 12 : hours % 12; // convert 24-hour to 12-hour format
    const paddedMonth = month.toString().padStart(2, '0'); // pad month with leading zero if needed
    const paddedDay = day.toString().padStart(2, '0'); // pad day with leading zero if needed

    return `${paddedMonth}/${paddedDay}/${year} ${formattedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
}

function getDate(dateTime) {
    const date = new Date(dateTime);

    const month = date.getMonth() + 1; // getMonth() returns 0-based month, so add 1
    const day = date.getDate();
    const year = date.getFullYear();

    const paddedMonth = month.toString().padStart(2, '0'); // pad month with leading zero if needed
    const paddedDay = day.toString().padStart(2, '0'); // pad day with leading zero if needed

    return `${paddedMonth}/${paddedDay}/${year}`;
}

function getTime(dateTime) {
    const date = new Date(dateTime);

    const hours = date.getHours();
    const minutes = date.getMinutes();

    const ampm = hours >= 12 ? 'PM' : 'AM';

    const formattedHours = hours % 12 === 0 ? 12 : hours % 12; // convert 24-hour to 12-hour format

    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
}

function getTimeWithSeconds(dateTime) {
    const date = new Date(dateTime);

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const ampm = hours >= 12 ? 'PM' : 'AM';

    const formattedHours = hours % 12 === 0 ? 12 : hours % 12; // convert 24-hour to 12-hour format

    return `${formattedHours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${ampm}`;
}

function convertToSearchDate(dateTime) {
    const year = dateTime.$y;
    const month = (dateTime.$M + 1).toString().padStart(2, '0');
    const day = dateTime.$D.toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
}


const DateTimeHelper = {
    convertToLocalFormatWithSeconds,
    convertToLocalFormat,
    getDate,
    getTime,
    getTimeWithSeconds,
    convertToSearchDate
}

export default DateTimeHelper;