"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const temperature_sensor_1 = __importDefault(require("./temperature_sensor"));
const temperature_threshold_1 = __importDefault(require("./temperature_threshold"));
const router = (0, express_1.Router)();
router.use('/sensor', temperature_sensor_1.default);
router.use('/threshold', temperature_threshold_1.default);
exports.default = router;
