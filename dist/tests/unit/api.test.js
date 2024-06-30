"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
const temperatureSensorHandler_1 = __importDefault(require("../../handlers/temperatureSensorHandler"));
const temperatureThresholdHandler_1 = __importDefault(require("../../handlers/temperatureThresholdHandler"));
const data_source_1 = require("../../data/data-source");
jest.mock('../../handlers/temperatureSensorHandler');
jest.mock('../../handlers/temperatureThresholdHandler');
jest.mock('../../data/data-source', () => ({
    dataSource: {
        initialize: jest.fn().mockResolvedValue(true)
    },
}));
describe('Temperature Sensor API', () => {
    beforeAll(async () => {
        await data_source_1.dataSource.initialize();
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('GET /api/v1/sensor/state', () => {
        it('should return the current state', async () => {
            const mockState = { State: 'WARM' };
            temperatureSensorHandler_1.default.getState.mockResolvedValue(mockState);
            const response = await (0, supertest_1.default)(app_1.default).get('/api/v1/sensor/state');
            expect(response.status).toBe(200);
            expect(response.body).toBe(mockState.State);
            expect(temperatureSensorHandler_1.default.getState).toHaveBeenCalledTimes(1);
        });
        it('should return 404 if state not found', async () => {
            temperatureSensorHandler_1.default.getState.mockRejectedValue(null);
            const response = await (0, supertest_1.default)(app_1.default).get('/api/v1/sensor/state');
            expect(response.status).toBe(404);
            expect(response.text).toBe('State not found.');
            expect(temperatureSensorHandler_1.default.getState).toHaveBeenCalledTimes(1);
        });
    });
    describe('GET /api/v1/sensor', () => {
        it('should return the last fifteen records', async () => {
            const mockRecords = [{ temperature: 20 }, { temperature: 25 }];
            temperatureSensorHandler_1.default.getLastFifteenRecords.mockResolvedValue(mockRecords);
            const response = await (0, supertest_1.default)(app_1.default).get('/api/v1/sensor');
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockRecords);
            expect(temperatureSensorHandler_1.default.getLastFifteenRecords).toHaveBeenCalledTimes(1);
        });
    });
    describe('POST /api/v1/sensor', () => {
        it('should insert a new record and update state', async () => {
            const mockRecord = { temperature: 22 };
            temperatureSensorHandler_1.default.insertRecord.mockResolvedValue(mockRecord);
            temperatureSensorHandler_1.default.updateState.mockResolvedValue({ State: 'WARM' });
            const response = await (0, supertest_1.default)(app_1.default)
                .post('/api/v1/sensor')
                .send({ temperature: 22 });
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockRecord);
            expect(temperatureSensorHandler_1.default.insertRecord).toHaveBeenCalledWith(22);
            expect(temperatureSensorHandler_1.default.insertRecord).toHaveBeenCalledTimes(1);
            expect(temperatureSensorHandler_1.default.updateState).toHaveBeenCalledWith(mockRecord);
            expect(temperatureSensorHandler_1.default.updateState).toHaveBeenCalledTimes(1);
        });
    });
    describe('POST /api/v1/threshold', () => {
        it('should update the threshold and state', async () => {
            const mockThreshold = { coldToWarm: 10, warmToHot: 30 };
            temperatureThresholdHandler_1.default.updateThreshold.mockResolvedValue(mockThreshold);
            temperatureThresholdHandler_1.default.updateState.mockResolvedValue({ State: 'WARM' });
            const response = await (0, supertest_1.default)(app_1.default)
                .post('/api/v1/threshold')
                .send(mockThreshold);
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockThreshold);
            expect(temperatureThresholdHandler_1.default.updateThreshold).toHaveBeenCalledWith(10, 30);
            expect(temperatureThresholdHandler_1.default.updateThreshold).toHaveBeenCalledTimes(1);
            expect(temperatureThresholdHandler_1.default.updateState).toHaveBeenCalledWith(mockThreshold);
            expect(temperatureThresholdHandler_1.default.updateState).toHaveBeenCalledTimes(1);
        });
    });
});
