const inquirer = require("inquirer");

const validateTime = require("./validateTime");
const convertTime = require("./convertTime");

const timezones = [
    "UTC (Coordinated Universal Time)",
    "CST (China Standard Time)",
    "EST (Eastern Standard Time)",
    "JST (Japan Standard Time)",
    "IST (India Standard Time)",
    "PST (Pacific Standard Time)",
    "GMT (Greenwich Mean Time)",
    "CET (Central European Time)",
    "EET (Eastern European Time)",
    "KST (Korea Standard Time)",
    "MSK (Moscow Standard Time)",
    "PHT (Philippine Time)",
    "BRT (Brasília Time)",
    "EAST (Eastern African Time)",
    "WET (Western European Time)",
    "CAT (Central Africa Time)",
    "EAT (Eastern Africa Time)",
    "AST (Arabia Standard Time)",
    "BTT (Bhutan Time)",
    "NPT (Nepal Time)",
];

inquirer
    .prompt([
        {
            type: "list",
            name: "current_timezone",
            message: "What is the current timezone?",
            choices: timezones,
        },
        {
            type: "list",
            name: "convert_to_timezone",
            message: "In which timezone you want to convert?",
            choices: timezones,
        },
        {
            type: "input",
            name: "current_time",
            message: `Enter time in format of 'HH:MM AM/PM' :`,
            default: "12:00 AM",
        },
    ])
    .then((answers) => {
        const current_timezone = answers["current_timezone"].split(" ")[0];
        const convert_to_timezone =
            answers["convert_to_timezone"].split(" ")[0];
        const current_time = answers["current_time"];

        if (!validateTime(current_time)) {
            throw new Error(
                `Please enter correct time in format of 'HH:MM AM/PM'`
            );
        }

        // convert time function returns converted time
        const converted_time = convertTime(
            current_timezone,
            convert_to_timezone,
            current_time
        );

        console.log(
            `Current_Timezone_Time (${current_timezone}) : ${current_time}`
        );
        console.log(
            `Converted_Timezone_Time (${convert_to_timezone}) : ${converted_time}`
        );
    })
    .catch((error) => {
        console.log(error.message);
        process.exit();
    });
