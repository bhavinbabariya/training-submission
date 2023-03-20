const inquirer = require("inquirer");
const validateTime = require("./validateTime");
const findStatusPhase1 = require("./phase1");
const findStatusPhase2 = require("./phase2");
const findStatusPhase3 = require("./phase3");

//here i am writing weekdays two times, because later we have to find two weekdays index difference
//so if i will not write like this, it will give output "5" as "Sat" and "Mon" difference, but real output is "2"
const weekdays = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
];
let input_weekday, input_time, phase;

//taking user input
inquirer
    .prompt([
        {
            type: "list",
            name: "weekday",
            message: "Choose weekday : ",
            choices: weekdays,
        },
        {
            type: "input",
            name: "time",
            message: `Enter time in format of 'HH:MM AM/PM' :`,
            default: "10:00 AM",
            validate: function (input) {
                if (!validateTime(input)) {
                    return `Please enter correct time in format of 'HH:MM AM/PM'`;
                }
                return true;
            },
        },
        {
            type: "list",
            name: "phase",
            message: "Choose Phase : ",
            choices: ["phase1", "phase2", "phase3"],
        },
    ])
    .then((answers) => {
        input_weekday = answers.weekday;
        input_time = answers.time;
        phase = answers.phase;

        if (!validateTime(input_time)) {
            throw new Error(
                `Please enter correct time in format of 'HH:MM AM/PM'`
            );
        }

        let shop_status;

        if (phase === "phase1")
            shop_status = findStatusPhase1(input_time, input_weekday);
        else if (phase === "phase2")
            shop_status = findStatusPhase2(input_time, input_weekday);
        else shop_status = findStatusPhase3(input_time, input_weekday);

        console.log(shop_status);
    })
    .catch((error) => {
        console.log(error);
        console.error(error.message);
        process.exit();
    });
