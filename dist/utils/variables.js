"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOKEN_KEY = exports.MONGO_URI = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const { env } = process;
exports.MONGO_URI = env.MONGO_URI, exports.TOKEN_KEY = env.TOKEN_KEY;
//# sourceMappingURL=variables.js.map