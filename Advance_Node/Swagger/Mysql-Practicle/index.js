const app = require("./express");
const sequelize = require("./sequelize");
const chalk = require("chalk");
const dotenv = require("dotenv");
const addSwaggerDoc = require("./swagger");
dotenv.config();

const PORT = process.env.PORT;

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

    await addSwaggerDoc(app);

    console.log(
        chalk.bgCyan.bold(
            `Starting Sequelize + Express example on port ${PORT}...`
        )
    );

    app.listen(PORT, () => {
        console.log(
            chalk.bgGreen.bold(`Express server started on port ${PORT}.`)
        );
    });
}

init();
