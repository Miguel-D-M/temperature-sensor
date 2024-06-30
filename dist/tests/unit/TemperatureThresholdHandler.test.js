"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const temperature_threshold_entity_1 = require("../../data/entity/temperature.threshold.entity");
const temperatureThresholdRepository_1 = __importDefault(require("../../data/repository/temperatureThresholdRepository"));
const temperatureThresholdHandler_1 = __importDefault(require("../../handlers/temperatureThresholdHandler"));
const sensor_state_entity_1 = require("../../data/entity/sensor.state.entity");
const temperatureRecordRepository_1 = __importDefault(require("../../data/repository/temperatureRecordRepository"));
const stateRepository_1 = __importDefault(require("../../data/repository/stateRepository"));
jest.mock('../../data/repository/temperatureRecordRepository');
jest.mock('../../data/repository/stateRepository');
jest.mock('../../data/repository/temperatureThresholdRepository');
describe('TemperatureThresholdHandler', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should update the temperature threshold', async () => {
        const mockColdToWarm = 10;
        const mockWarmToHot = 30;
        const mockThreshold = new temperature_threshold_entity_1.TemperatureThreshold();
        mockThreshold.coldToWarm = mockColdToWarm;
        mockThreshold.warmToHot = mockWarmToHot;
        temperatureThresholdRepository_1.default.insertThreshold.mockResolvedValue(mockThreshold);
        const threshold = await temperatureThresholdHandler_1.default.updateThreshold(mockColdToWarm, mockWarmToHot);
        expect(threshold).toEqual(mockThreshold);
        expect(temperatureThresholdRepository_1.default.insertThreshold).toHaveBeenCalledWith(mockColdToWarm, mockWarmToHot);
        expect(temperatureThresholdRepository_1.default.insertThreshold).toHaveBeenCalledTimes(1);
    });
    it('should update the state based on the new threshold', async () => {
        const mockThreshold = new temperature_threshold_entity_1.TemperatureThreshold();
        mockThreshold.coldToWarm = 15;
        mockThreshold.warmToHot = 30;
        const mockRecord = { temperature: 20 };
        const mockState = { State: sensor_state_entity_1.SensorState.COLD, save: jest.fn().mockResolvedValue({ State: sensor_state_entity_1.SensorState.WARM }) };
        temperatureRecordRepository_1.default.getLastRecord.mockResolvedValue(mockRecord);
        stateRepository_1.default.getState.mockResolvedValue(mockState);
        const state = await temperatureThresholdHandler_1.default.updateState(mockThreshold);
        expect(state.State).toEqual(sensor_state_entity_1.SensorState.WARM);
        expect(temperatureRecordRepository_1.default.getLastRecord).toHaveBeenCalledTimes(1);
        expect(stateRepository_1.default.getState).toHaveBeenCalledTimes(1);
        expect(mockState.save).toHaveBeenCalledTimes(1);
    });
});
