const data = require("./data.json");

/**
 *
 * @param {string} current_timezone
 * @param {string} convert_to_timezone
 * @param {string} current_time
 * @returns {string}
 */

const convertTime = (current_timezone, convert_to_timezone, current_time) => {
    // offset1 : offset value of current timezone
    // offset2 : offset value of convert timezone

    const offset1 = data[current_timezone].offset;
    const offset2 = data[convert_to_timezone].offset;

    // initialise date with given time
    const date = new Date(`01/02/2000 ${current_time}`);

    // convert time from given time to UTC time zone
    const utc_time = date.getTime() - offset1 * (60 * 60 * 1000);

    // convert time from UTC time to specified time zone
    const new_time = utc_time + offset2 * (60 * 60 * 1000);

    // set time to date object
    date.setTime(new_time);

    // extract HH:MM AM/PM format from date object
    const converted_time = date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
    });

    return converted_time;
};

module.exports = convertTime;
