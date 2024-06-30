"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = void 0;
const typeorm_1 = require("typeorm");
const temperature_threshold_entity_1 = require("./entity/temperature.threshold.entity");
const sensor_state_entity_1 = require("./entity/sensor.state.entity");
const temperature_record_entity_1 = require("./entity/temperature.record.entity");
exports.dataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [temperature_record_entity_1.Record, sensor_state_entity_1.State, temperature_threshold_entity_1.TemperatureThreshold],
    logging: true,
    synchronize: true,
});
