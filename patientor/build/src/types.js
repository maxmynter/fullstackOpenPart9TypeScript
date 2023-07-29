"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntryType = exports.Gender = void 0;
var Gender;
(function (Gender) {
    Gender["male"] = "male";
    Gender["female"] = "female";
    Gender["other"] = "other";
})(Gender || (exports.Gender = Gender = {}));
var EntryType;
(function (EntryType) {
    EntryType["Occupational"] = "OccupationalHealthcare";
    EntryType["Check"] = "HealthCheck";
    EntryType["hospital"] = "Hospital";
})(EntryType || (exports.EntryType = EntryType = {}));
