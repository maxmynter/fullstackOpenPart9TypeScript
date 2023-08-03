import express from "express";
import patientService from "../services/patientService";
import utils from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getNonSensitiveDPatientEntries());
});

router.get("/:id", (req, res) => {
  const patientId: string = req.params.id;
  try {
    res.send(patientService.getPatientByID(patientId));
  } catch (error: unknown) {
    let errorMessage = "Error getting patient. ";
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post("/:id/entries", (req, res) => {
  const targetId = req.params.id;
  const entry = utils.toNewEntry(req.body);

  try {
    const patientWithNewEntry = patientService.addEntryToPatient({
      targetId,
      entry,
    });
    res.send(patientWithNewEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post("/", (req, res) => {
  try {
    const newPatient = utils.toNewPatient(req.body);
    const addedPatient = patientService.addPatientEntry(newPatient);
    res.send(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
