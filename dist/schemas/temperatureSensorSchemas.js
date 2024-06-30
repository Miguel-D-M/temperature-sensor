"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recordInsertSchema = void 0;
const zod_1 = require("zod");
exports.recordInsertSchema = zod_1.z.object({
    temperature: zod_1.z.number()
});
