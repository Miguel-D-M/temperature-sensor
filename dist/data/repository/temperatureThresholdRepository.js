"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemperatureThresholdRepository = void 0;
const data_source_1 = require("../data-source");
const temperature_threshold_entity_1 = require("../entity/temperature.threshold.entity");
const typeorm_1 = require("typeorm");
class TemperatureThresholdRepository {
    constructor() {
        this.insertThreshold = async (coldToWarm, warmToHot) => {
            let threshold = await data_source_1.dataSource.manager.getRepository(temperature_threshold_entity_1.TemperatureThreshold).findOne({ where: { id: (0, typeorm_1.Not)((0, typeorm_1.IsNull)()) } });
            if (threshold == null) {
                threshold = new temperature_threshold_entity_1.TemperatureThreshold();
            }
            threshold.coldToWarm = coldToWarm;
            threshold.warmToHot = warmToHot;
            return threshold.save();
        };
        this.getThreshold = () => {
            return data_source_1.dataSource.manager.getRepository(temperature_threshold_entity_1.TemperatureThreshold).findOne({ where: { id: (0, typeorm_1.Not)((0, typeorm_1.IsNull)()) } });
        };
    }
    static getInstance() {
        if (!TemperatureThresholdRepository.instance) {
            TemperatureThresholdRepository.instance = new TemperatureThresholdRepository();
        }
        return TemperatureThresholdRepository.instance;
    }
}
exports.TemperatureThresholdRepository = TemperatureThresholdRepository;
const temperatureThresholdRepository = TemperatureThresholdRepository.getInstance();
exports.default = temperatureThresholdRepository;
