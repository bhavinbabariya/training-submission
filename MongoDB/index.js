const app = require("./express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const chalk = require("chalk");

dotenv.config();

const PORT = process.env.PORT;

async function assertDatabaseConnectionOk() {
    console.log(chalk.bgCyan.bold(`Checking database connection...`));
    try {
        mongoose.set("debug", true);
        await mongoose.connect(process.env.DB);
        console.log(chalk.bgGreen.bold("Database connection OK!"));
    } catch (error) {
        console.log(chalk.bgRed("Unable to connect to the database:"));
        console.log(chalk.bgRed(error.message));
        process.exit(1);
    }
}

async function init() {
    await assertDatabaseConnectionOk();
    console.log(
        chalk.bgCyan.bold(
            `Starting Mongoose + Express server on port ${PORT}...`
        )
    );
    app.listen(PORT, () => {
        console.log(
            chalk.bgGreen.bold(`Express server started on port ${PORT}`)
        );
    });
}

init();
