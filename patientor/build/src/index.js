"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const diagnoses_1 = __importDefault(require("./routes/diagnoses"));
const patients_1 = __importDefault(require("./routes/patients"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = 3001;
// Use CORS middleware
app.use((0, cors_1.default)({ origin: ["http://localhost:3000", "http://localhost:3001"] }));
app.use("/api/diagnoses", diagnoses_1.default);
app.use("/api/patients", patients_1.default);
app.get("/api/ping", (_req, res) => {
    console.log("Pong");
    res.status(200).send("PONG");
});
app.listen(PORT, () => {
    console.log(`Server Running on PORT: ${PORT}`);
});
