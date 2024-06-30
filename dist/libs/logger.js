"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const path_1 = __importDefault(require("path"));
const { combine, timestamp, colorize, printf } = winston_1.format;
const level = () => {
    const env = process.env.NODE_ENV || 'development';
    const isDevelopment = env === 'development';
    return isDevelopment ? 'debug' : 'warn';
};
const getCallerInfo = () => {
    const stack = new Error().stack?.split('\n')[3];
    const stackParts = stack?.trim().split(' ');
    const callerInfo = stackParts ? stackParts[stackParts.length - 1].replace(/\(|\)/g, '') : '';
    const [filePath, lineNumber] = callerInfo.split(':');
    const fileName = path_1.default.basename(filePath);
    return `${fileName}:${lineNumber}`;
};
const Logger = (0, winston_1.createLogger)({
    level: level(),
    format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }), colorize({ all: true }), printf((info) => {
        const callerInfo = getCallerInfo();
        return `${info.timestamp} ${info.level}: ${info.message} [${callerInfo}]`;
    })),
    transports: [
        new winston_1.transports.Console()
    ],
});
exports.default = Logger;
