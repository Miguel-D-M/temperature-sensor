"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.State = exports.SensorState = void 0;
const typeorm_1 = require("typeorm");
var SensorState;
(function (SensorState) {
    SensorState["HOT"] = "HOT";
    SensorState["WARM"] = "WARM";
    SensorState["COLD"] = "COLD";
})(SensorState || (exports.SensorState = SensorState = {}));
let State = class State extends typeorm_1.BaseEntity {
};
exports.State = State;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], State.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: SensorState
    }),
    __metadata("design:type", String)
], State.prototype, "State", void 0);
exports.State = State = __decorate([
    (0, typeorm_1.Entity)()
], State);