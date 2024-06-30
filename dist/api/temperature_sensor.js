"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validationMiddleware_1 = require("../middlewares/validationMiddleware");
const temperatureSensorSchemas_1 = require("../schemas/temperatureSensorSchemas");
const logger_1 = __importDefault(require("../libs/logger"));
const temperatureSensorHandler_1 = __importDefault(require("../handlers/temperatureSensorHandler"));
const router = (0, express_1.Router)();
/* GET current state */
router.get('/state', async function (req, res, next) {
    try {
        const state = await temperatureSensorHandler_1.default.getState();
        if (state === null) {
            res.status(404).send("State not found.");
        }
        res.status(200).json(state.State);
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(500).send({ message: "Error fetching sample" });
    }
});
/* GET last 15 temperature records. */
router.get('/', async function (req, res, next) {
    try {
        const records = await temperatureSensorHandler_1.default.getLastFifteenRecords();
        res.status(200).json(records);
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(500).send({ message: "Error fetching records" });
    }
});
/* POST temperature record.
* Insert a new record then update the current state of the sensor
*/
router.post('/', (0, validationMiddleware_1.validateData)(temperatureSensorSchemas_1.recordInsertSchema), async function (req, res, next) {
    try {
        const record = await temperatureSensorHandler_1.default.insertRecord(req.body.temperature);
        await temperatureSensorHandler_1.default.updateState(record);
        res.status(200).json(record);
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(500).send({ message: "Error saving record" });
    }
});
exports.default = router;
