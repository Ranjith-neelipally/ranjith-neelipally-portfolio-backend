"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/endpoint", (req, res) => {
    res.json({ msg: "Hello world" });
});
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});
