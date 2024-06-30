"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemperatureSensorHandler = void 0;
const sensor_state_entity_1 = require("../data/entity/sensor.state.entity");
const temperatureRecordRepository_1 = __importDefault(require("../data/repository/temperatureRecordRepository"));
const stateRepository_1 = __importDefault(require("../data/repository/stateRepository"));
const temperatureThresholdRepository_1 = __importDefault(require("../data/repository/temperatureThresholdRepository"));
class TemperatureSensorHandler {
    constructor() {
        this.getLastFifteenRecords = () => {
            return temperatureRecordRepository_1.default.getLastFifteenRecords();
        };
        this.getState = async () => {
            return stateRepository_1.default.getState();
        };
        this.updateState = async (lastRecord) => {
            const threshold = await temperatureThresholdRepository_1.default.getThreshold();
            if (threshold !== undefined) {
                let state = await stateRepository_1.default.getState();
                if (state == null) {
                    state = new sensor_state_entity_1.State();
                }
                const newState = lastRecord.temperature >= threshold.warmToHot ? sensor_state_entity_1.SensorState.HOT : lastRecord.temperature >= threshold.coldToWarm ? sensor_state_entity_1.SensorState.WARM : sensor_state_entity_1.SensorState.COLD;
                if (newState !== state.State) {
                    state.State = newState;
                    state = await state.save();
                }
                return state;
            }
        };
        this.insertRecord = (temperature) => {
            return temperatureRecordRepository_1.default.insertRecord(temperature);
        };
    }
    static getInstance() {
        if (!TemperatureSensorHandler.instance) {
            TemperatureSensorHandler.instance = new TemperatureSensorHandler();
        }
        return TemperatureSensorHandler.instance;
    }
}
exports.TemperatureSensorHandler = TemperatureSensorHandler;
const temperatureSensorHandler = TemperatureSensorHandler.getInstance();
exports.default = temperatureSensorHandler;
