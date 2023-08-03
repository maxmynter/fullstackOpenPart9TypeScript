"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const patients_1 = __importDefault(require("../../data/patients"));
const getPatientEntries = () => {
    return patients_1.default;
};
const getNonSensitiveDPatientEntries = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};
const getPatientByID = (id) => {
    return patients_1.default.find((patient) => patient.id === id);
};
const addPatientEntry = (patient) => {
    const id = (0, uuid_1.v1)();
    const newPatient = Object.assign({ id }, patient);
    patients_1.default.push(newPatient);
    return newPatient;
};
const addEntryToPatient = ({ targetId, entry, }) => {
    const indexOfPatient = patients_1.default.findIndex((patient) => patient.id === targetId);
    if (indexOfPatient !== -1) {
        const entryWithId = Object.assign({ id: (0, uuid_1.v1)() }, entry);
        patients_1.default[indexOfPatient].entries = [
            ...patients_1.default[indexOfPatient].entries,
            entryWithId,
        ];
        return patients_1.default[indexOfPatient];
    }
    else {
        throw new Error(`No patient with id : ${targetId}`);
    }
};
exports.default = {
    getPatientEntries,
    getNonSensitiveDPatientEntries,
    addPatientEntry,
    getPatientByID,
    addEntryToPatient,
};
