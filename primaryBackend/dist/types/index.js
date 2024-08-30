"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zapCreateSchema = exports.signInSchema = exports.signupSchema = void 0;
const zod_1 = require("zod");
exports.signupSchema = zod_1.z.object({
    email: zod_1.z.string().min(5),
    password: zod_1.z.string().min(6),
    name: zod_1.z.string()
});
exports.signInSchema = zod_1.z.object({
    email: zod_1.z.string(),
    password: zod_1.z.string(),
});
exports.zapCreateSchema = zod_1.z.object({
    availableTriggerId: zod_1.z.string(),
    triggerMetadata: zod_1.z.any().optional(),
    actions: zod_1.z.array(zod_1.z.object({
        actionId: zod_1.z.string(),
        actionMetaData: zod_1.z.any().optional()
    }))
});
