"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const logger_1 = __importDefault(require("./libs/logger"));
const port = process.env.APP_PORT;
app_1.default.listen(port, () => {
    logger_1.default.info(`Listening: http://localhost:${port}`);
});
