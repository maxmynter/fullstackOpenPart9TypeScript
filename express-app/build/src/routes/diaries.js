"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diaryService_1 = __importDefault(require("../services/diaryService"));
const utils_1 = __importDefault(require("../utils"));
const router = express_1.default.Router();
router.get("/", (_req, res) => {
    const diary = diaryService_1.default.getEntries();
    if (diary) {
        res.send(diary);
    }
    else {
        res.sendStatus(404);
    }
});
router.post("/", (req, res) => {
    try {
        const newDiaryEntry = (0, utils_1.default)(req.body);
        const addedEntry = diaryService_1.default.addDiary(newDiaryEntry);
        res.json(addedEntry);
    }
    catch (error) {
        let errorMessage = "Something went wrong.";
        if (error instanceof Error) {
            errorMessage += " Error: " + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
exports.default = router;
