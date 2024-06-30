"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.thresholdInsertSchema = void 0;
const zod_1 = require("zod");
exports.thresholdInsertSchema = zod_1.z.object({
    coldToWarm: zod_1.z.number(),
    warmToHot: zod_1.z.number()
}).refine(data => data.warmToHot > data.coldToWarm, {
    message: " the warmToHot value should be greater than coldToWarm value"
});
