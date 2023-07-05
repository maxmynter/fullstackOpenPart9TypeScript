"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 3000;
app.get("/ping", (_req, res) => {
    console.log("Pong");
    res.status(200).send("PONG");
});
app.listen(PORT, () => {
    console.log(`Server Running on PORT: ${PORT}`);
});
