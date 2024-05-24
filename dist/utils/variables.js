"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGO_URI = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const { env } = process;
exports.MONGO_URI = env.MONGO_URI;
//# sourceMappingURL=variables.js.map