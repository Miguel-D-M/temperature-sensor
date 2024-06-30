"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemperatureRecordRepository = void 0;
const data_source_1 = require("../data-source");
const temperature_record_entity_1 = require("../entity/temperature.record.entity");
class TemperatureRecordRepository {
    constructor() { }
    static getInstance() {
        if (!TemperatureRecordRepository.instance) {
            TemperatureRecordRepository.instance = new TemperatureRecordRepository();
        }
        return TemperatureRecordRepository.instance;
    }
    async getLastFifteenRecords() {
        return data_source_1.dataSource.getRepository(temperature_record_entity_1.Record)
            .createQueryBuilder("record")
            .orderBy("record.created_at", "DESC")
            .limit(15)
            .getMany();
    }
    async getLastRecord() {
        return data_source_1.dataSource.getRepository(temperature_record_entity_1.Record)
            .createQueryBuilder("record")
            .orderBy("record.created_at", "DESC")
            .getOne();
    }
    async insertRecord(temperature) {
        const newRecord = new temperature_record_entity_1.Record();
        newRecord.temperature = temperature;
        return data_source_1.dataSource.getRepository(temperature_record_entity_1.Record).save(newRecord);
    }
}
exports.TemperatureRecordRepository = TemperatureRecordRepository;
const temperatureRecordRepository = TemperatureRecordRepository.getInstance();
exports.default = temperatureRecordRepository;
