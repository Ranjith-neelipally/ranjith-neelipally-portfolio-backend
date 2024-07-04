"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomNumber = void 0;
const generateRandomNumber = (length) => {
    let token = "";
    const digits = "0123456789";
    const digitsLength = digits.length;
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * digitsLength);
        token += digits.charAt(randomIndex);
    }
    return token;
};
exports.generateRandomNumber = generateRandomNumber;
