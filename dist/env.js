"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
require("dotenv/config");
/*
Declare all your env variables there with their type, at runtime it will check if all required
env variables are there, if not it will stop the software
 */
const envVariables = zod_1.z.object({
    DATABASE_HOST: zod_1.z.string(),
    DATABASE_PORT: zod_1.z.string(),
    DATABASE_USER: zod_1.z.string(),
    DATABASE_PASSWORD: zod_1.z.string(),
    DATABASE_NAME: zod_1.z.string(),
    APP_PORT: zod_1.z.string()
});
envVariables.parse(process.env);
