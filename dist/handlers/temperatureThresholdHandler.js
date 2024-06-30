"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemperatureThresholdHandler = void 0;
const stateRepository_1 = __importDefault(require("../data/repository/stateRepository"));
const sensor_state_entity_1 = require("../data/entity/sensor.state.entity");
const temperatureRecordRepository_1 = __importDefault(require("../data/repository/temperatureRecordRepository"));
const temperatureThresholdRepository_1 = __importDefault(require("../data/repository/temperatureThresholdRepository"));
class TemperatureThresholdHandler {
    constructor() {
        this.updateThreshold = (coldToWarm, warmToHot) => {
            return temperatureThresholdRepository_1.default.insertThreshold(coldToWarm, warmToHot);
        };
        this.updateState = async (newThreshold) => {
            const lastRecord = await temperatureRecordRepository_1.default.getLastRecord();
            if (lastRecord !== null) {
                let state = await stateRepository_1.default.getState();
                if (state == null) {
                    state = new sensor_state_entity_1.State();
                }
                const newState = lastRecord.temperature >= newThreshold.warmToHot ? sensor_state_entity_1.SensorState.HOT : lastRecord.temperature >= newThreshold.coldToWarm ? sensor_state_entity_1.SensorState.WARM : sensor_state_entity_1.SensorState.COLD;
                if (newState !== state.State) {
                    state.State = newState;
                    await state.save();
                }
                return state;
            }
        };
    }
    static getInstance() {
        if (!TemperatureThresholdHandler.instance) {
            TemperatureThresholdHandler.instance = new TemperatureThresholdHandler();
        }
        return TemperatureThresholdHandler.instance;
    }
}
exports.TemperatureThresholdHandler = TemperatureThresholdHandler;
// Usage example
const temperatureThresholdHandler = TemperatureThresholdHandler.getInstance();
exports.default = temperatureThresholdHandler;
