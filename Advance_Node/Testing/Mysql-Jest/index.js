const app = require("./express");
const sequelize = require("./sequelize");
const chalk = require("chalk");
const dotenv = require("dotenv");
const { APP_CONFIG } = require("./config");
dotenv.config();

const PORT = APP_CONFIG.port;

async function assertDatabaseConnectionOk() {
    console.log(chalk.bgCyan.bold(`Checking database connection...`));
    try {
        await sequelize.authenticate();
        console.log(chalk.bgGreen.bold("Database connection OK!"));

        await sequelize.sync({ alter: false });

        console.log(chalk.bgGreen.bold("Database synchronized OK!"));
    } catch (error) {
        console.log(chalk.bgRed("Unable to connect to the database:"));
        console.log(chalk.bgRed(error.message));
        process.exit(1);
    }
}

async function init() {
    await assertDatabaseConnectionOk();
    console.log(sequelize.models);
    console.log(
        chalk.bgCyan.bold(
            `Starting Sequelize + Express example on port ${PORT}...`
        )
    );

    console.log(
        chalk.bgYellowBright.bold(`ENVIRONMENT :  ${process.env.NODE_ENV}.`)
    );

    app.listen(PORT, () => {
        console.log(
            chalk.bgGreen.bold(`Express server started on port ${PORT}.`)
        );
    });
}

init();

module.exports = app;
