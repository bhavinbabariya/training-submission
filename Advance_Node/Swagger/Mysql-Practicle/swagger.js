const YAML = require("yamljs");
const swaggerUI = require("swagger-ui-express");
const chalk = require("chalk");
const addSwaggerDoc = async (app) => {
    try {
        const specs = await YAML.load("swagger-config.yaml");
        app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs));
    } catch (error) {
        console.log(chalk.bgRed("Unable load Swagger Yaml File"));
        console.log(chalk.bgRed(error.message));
        process.exit(1);
    }
};

module.exports = addSwaggerDoc;
