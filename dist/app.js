"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const api_1 = __importDefault(require("./api"));
const data_source_1 = require("./data/data-source");
const logger_1 = __importDefault(require("./libs/logger"));
require("./env");
data_source_1.dataSource
    .initialize()
    .then(() => {
    logger_1.default.info("Data Source has been initialized!");
})
    .catch((err) => {
    logger_1.default.error("Error during Data Source initialization:", err);
    throw err;
});
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/v1', api_1.default);
exports.default = app;
