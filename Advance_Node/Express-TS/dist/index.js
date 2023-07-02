"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("./express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const chalk_1 = __importDefault(require("chalk"));
dotenv_1.default.config();
const PORT = +process.env.PORT;
function assertDatabaseConnectionOk() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(chalk_1.default.bgCyan.bold(`Checking database connection...`));
        try {
            mongoose_1.default.set("debug", true);
            yield mongoose_1.default.connect(process.env.DB);
            console.log(chalk_1.default.bgGreen.bold("Database connection OK!"));
        }
        catch (error) {
            console.log(chalk_1.default.bgRed("Unable to connect to the database:"));
            if (error instanceof Error)
                console.log(chalk_1.default.bgRed(error.message));
            process.exit(1);
        }
    });
}
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        yield assertDatabaseConnectionOk();
        console.log(chalk_1.default.bgCyan.bold(`Starting Mongoose + Express server on port ${PORT}...`));
        express_1.default.listen(PORT, () => {
            console.log(chalk_1.default.bgGreen.bold(`Express server started on port ${PORT}`));
        });
    });
}
init();
