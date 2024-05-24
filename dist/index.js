"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("./database");
const app = (0, express_1.default)();
const port = process.env.PORT || 8083;
app.get('/', (_req, res) => {
    return res.json({ message: 'Hello World!' });
});
app.listen(port, () => {
    return console.log(`Server is listening on http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map