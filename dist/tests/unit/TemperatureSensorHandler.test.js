"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const temperatureRecordRepository_1 = __importDefault(require("../../data/repository/temperatureRecordRepository"));
const temperatureSensorHandler_1 = __importDefault(require("../../handlers/temperatureSensorHandler"));
const sensor_state_entity_1 = require("../../data/entity/sensor.state.entity");
const stateRepository_1 = __importDefault(require("../../data/repository/stateRepository"));
const temperatureThresholdRepository_1 = __importDefault(require("../../data/repository/temperatureThresholdRepository"));
jest.mock('../../data/repository/temperatureRecordRepository');
jest.mock('../../data/repository/stateRepository');
jest.mock('../../data/repository/temperatureThresholdRepository');
describe('TemperatureSensorHandler Unit Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should return the last fifteen records', async () => {
        const mockRecords = [{ temperature: 20 }, { temperature: 25 }];
        temperatureRecordRepository_1.default.getLastFifteenRecords.mockResolvedValue(mockRecords);
        const records = await temperatureSensorHandler_1.default.getLastFifteenRecords();
        expect(records).toEqual(mockRecords);
        expect(temperatureRecordRepository_1.default.getLastFifteenRecords).toHaveBeenCalledTimes(1);
    });
    it('should return the current state', async () => {
        const mockState = { State: sensor_state_entity_1.SensorState.WARM };
        stateRepository_1.default.getState.mockResolvedValue(mockState);
        const state = await temperatureSensorHandler_1.default.getState();
        expect(state).toEqual(mockState);
        expect(stateRepository_1.default.getState).toHaveBeenCalledTimes(1);
    });
    it('should update the state based on the last record', async () => {
        const mockThreshold = { warmToHot: 30, coldToWarm: 15 };
        const mockState = { State: sensor_state_entity_1.SensorState.COLD, save: jest.fn().mockResolvedValue({ State: sensor_state_entity_1.SensorState.WARM }) };
        const mockRecord = { temperature: 20 };
        temperatureThresholdRepository_1.default.getThreshold.mockResolvedValue(mockThreshold);
        stateRepository_1.default.getState.mockResolvedValue(mockState);
        const state = await temperatureSensorHandler_1.default.updateState(mockRecord);
        expect(state.State).toEqual(sensor_state_entity_1.SensorState.WARM);
        expect(temperatureThresholdRepository_1.default.getThreshold).toHaveBeenCalledTimes(1);
        expect(stateRepository_1.default.getState).toHaveBeenCalledTimes(1);
        expect(mockState.save).toHaveBeenCalledTimes(1);
    });
    it('should insert a new record', async () => {
        const mockTemperature = 22;
        const mockRecord = { temperature: mockTemperature };
        temperatureRecordRepository_1.default.insertRecord.mockResolvedValue(mockRecord);
        const record = await temperatureSensorHandler_1.default.insertRecord(mockTemperature);
        expect(record).toEqual(mockRecord);
        expect(temperatureRecordRepository_1.default.insertRecord).toHaveBeenCalledWith(mockTemperature);
        expect(temperatureRecordRepository_1.default.insertRecord).toHaveBeenCalledTimes(1);
    });
});
