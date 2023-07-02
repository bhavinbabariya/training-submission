import app from "./express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import chalk from "chalk";

dotenv.config();

const PORT: number = +(process.env.PORT as string);

async function assertDatabaseConnectionOk() {
    console.log(chalk.bgCyan.bold(`Checking database connection...`));
    try {
        mongoose.set("debug", true);
        await mongoose.connect(process.env.DB as string);
        console.log(chalk.bgGreen.bold("Database connection OK!"));
    } catch (error: unknown) {
        console.log(chalk.bgRed("Unable to connect to the database:"));

        if (error instanceof Error) console.log(chalk.bgRed(error.message));
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
