"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("./database");
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const port = process.env.PORT || 8083;
app.get('/', (_req, res) => {
    return res.json({ message: 'Hello World!' });
});
app.get('/check', (req, res) => {
    if (mongoose_1.default.connection.readyState === 1) {
        res.json({ message: "connected" });
    }
    else {
        res.json({ message: "not connected" });
    }
});
app.listen(port, () => {
    return console.log(`Server is listening on http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map