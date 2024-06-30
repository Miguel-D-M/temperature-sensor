"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateRepository = void 0;
const data_source_1 = require("../data-source");
const sensor_state_entity_1 = require("../entity/sensor.state.entity");
const typeorm_1 = require("typeorm");
class StateRepository {
    constructor() { }
    static getInstance() {
        if (!StateRepository.instance) {
            StateRepository.instance = new StateRepository();
        }
        return StateRepository.instance;
    }
    async getState() {
        return data_source_1.dataSource.manager.getRepository(sensor_state_entity_1.State).findOne({ where: { id: (0, typeorm_1.Not)((0, typeorm_1.IsNull)()) } });
    }
}
exports.StateRepository = StateRepository;
const stateRepository = StateRepository.getInstance();
exports.default = stateRepository;
