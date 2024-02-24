"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestApiQuerySchema = exports.TestApiResponseSchema = void 0;
const zod_1 = require("zod");
exports.TestApiResponseSchema = zod_1.z.object({
    Hello: zod_1.z.string(),
});
exports.TestApiQuerySchema = zod_1.z.object({
    name: zod_1.z.string({ required_error: "Need name please" }),
});
//# sourceMappingURL=TestApi.js.map