"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ADMIN_MAIL = exports.MAILTRAP_PASSWORD = exports.MAILTRAP_USER = exports.MAIL_TRAP_TOKEN = exports.TOKEN_KEY = exports.MONGO_URI = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const { env } = process;
exports.MONGO_URI = env.MONGO_URI, exports.TOKEN_KEY = env.TOKEN_KEY, exports.MAIL_TRAP_TOKEN = env.MAIL_TRAP_TOKEN, exports.MAILTRAP_USER = env.MAILTRAP_USER, exports.MAILTRAP_PASSWORD = env.MAILTRAP_PASSWORD, exports.ADMIN_MAIL = env.ADMIN_MAIL;
