"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 3001;
// Use CORS middleware
app.use((0, cors_1.default)({ origin: "http://localhost:3000/" }));
app.get("/api/ping", (_req, res) => {
    console.log("Pong");
    res.status(200).send("PONG");
});
app.listen(PORT, () => {
    console.log(`Server Running on PORT: ${PORT}`);
});
