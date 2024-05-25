"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleAdminForm = void 0;
const HandleAdminForm = (req, res) => {
    const { name, email } = req.body;
    if (name && email) {
        res.json({ message: "working in postman" });
    }
    else {
        res.status(400).json({ message: "not working" });
    }
};
exports.HandleAdminForm = HandleAdminForm;
//# sourceMappingURL=index.js.map