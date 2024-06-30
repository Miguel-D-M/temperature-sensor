"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validationMiddleware_1 = require("../middlewares/validationMiddleware");
const temperatureThresholdSchema_1 = require("../schemas/temperatureThresholdSchema");
const logger_1 = __importDefault(require("../libs/logger"));
const temperatureThresholdHandler_1 = __importDefault(require("../handlers/temperatureThresholdHandler"));
const router = (0, express_1.Router)();
/* POST temperature threshold.
Update the current temperature Threshold configuration then update the state
*/
router.post('/', (0, validationMiddleware_1.validateData)(temperatureThresholdSchema_1.thresholdInsertSchema), async function (req, res, next) {
    const { coldToWarm, warmToHot } = req.body;
    try {
        const threshold = await temperatureThresholdHandler_1.default.updateThreshold(coldToWarm, warmToHot);
        await temperatureThresholdHandler_1.default.updateState(threshold);
        res.status(200).json(threshold);
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(500).send({ message: "Error saving threshold" });
    }
});
exports.default = router;
