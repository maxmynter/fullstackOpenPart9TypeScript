import { useState } from "react";
import patientService from "../../services/patients";
import {
  EntryType,
  newHealthCheckEntry,
  newEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
  HospitalEntry,
  newOccupationalHealthcareEntry,
  newHospitalEntry,
  Patient,
  SickLeave,
  Discharge,
} from "../../types";
import entryStyle from "./commonStyles";
import { Button } from "@mui/material";

const assertNever = (value: never): never => {
  throw new Error(`This should not have happened. Weird value ${value}`);
};

const FormInputRow = ({
  inputName,
  value,
  setValue,
}: {
  inputName: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", padding: "5px" }}>
      <p style={{ margin: "5px", color: "gray", fontSize: 12 }}>{inputName}</p>
      <input
        key={inputName}
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    </div>
  );
};

const FormInputSwitch = ({
  inputType,
  healthCheckRating,
  setHealthcheckRating,
  dischargeDate,
  setDischargeDate,
  dischargeCriteria,
  setDischargeCriteria,
  employerName,
  setEmployerName,
  sickLeaveStartDate,
  setSickLeaveStartDate,
  sickLeaveEndDate,
  setSickLeaveEndDate,
}: {
  inputType: EntryType;
  healthCheckRating: string;
  setHealthcheckRating: React.Dispatch<React.SetStateAction<string>>;
  dischargeDate: string;
  setDischargeDate: React.Dispatch<React.SetStateAction<string>>;
  dischargeCriteria: string;
  setDischargeCriteria: React.Dispatch<React.SetStateAction<string>>;
  employerName: string;
  setEmployerName: React.Dispatch<React.SetStateAction<string>>;
  sickLeaveStartDate: string;
  setSickLeaveStartDate: React.Dispatch<React.SetStateAction<string>>;
  sickLeaveEndDate: string;
  setSickLeaveEndDate: React.Dispatch<React.SetStateAction<string>>;
}) => {
  switch (inputType) {
    case EntryType.Check:
      return (
        <FormInputRow
          inputName={"Healthcheck Rating"}
          value={healthCheckRating}
          setValue={setHealthcheckRating}
        />
      );
    case EntryType.hospital:
      return (
        <>
          <FormInputRow
            inputName={"Discharge Date"}
            value={dischargeDate}
            setValue={setDischargeDate}
          />
          <FormInputRow
            inputName={"Dischare Criteria"}
            value={dischargeCriteria}
            setValue={setDischargeCriteria}
          />
        </>
      );
    case EntryType.Occupational:
      return (
        <>
          <FormInputRow
            inputName={"Employer Name"}
            value={employerName}
            setValue={setEmployerName}
          />
          <FormInputRow
            inputName={"Sick Leave Start Date"}
            value={sickLeaveStartDate}
            setValue={setSickLeaveStartDate}
          />
          <FormInputRow
            inputName={"Sicke Leave End Date"}
            value={sickLeaveEndDate}
            setValue={setSickLeaveEndDate}
          />
        </>
      );
    default:
      return assertNever(inputType);
  }
};

const AddEntryToPatient = ({
  id,
  updateEntries,
}: {
  id: string;
  updateEntries: React.Dispatch<
    React.SetStateAction<
      (OccupationalHealthcareEntry | HealthCheckEntry | HospitalEntry)[]
    >
  >;
}) => {
  const [toggleOpen, setToggleOpen] = useState(false);
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [description, setDescription] = useState("");
  const [healthCheckRating, setHealthcheckRating] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  const toggle = (): void => {
    setToggleOpen(!toggleOpen);
  };

  const clearInput = () => {
    setType("");
    setDate("");
    setSpecialist("");
    setHealthcheckRating("");
    setDescription("");
    setDiagnosisCodes("");
    setEmployerName("");
    setSickLeaveStartDate("");
    setSickLeaveEndDate("");
    setDischargeDate("");
    setDischargeCriteria("");
  };

  const addInput = async () => {
    const updatePatientAndCleanup = (updatedPatient: Patient) => {
      updateEntries(updatedPatient.entries);
      clearInput();
      setToggleOpen(!toggleOpen);
    };
    if (
      type === EntryType.Check ||
      type === EntryType.Occupational ||
      type === EntryType.hospital
    ) {
      const newEntry: newEntry = {
        type,
        date,
        description,
        specialist,
        diagnosisCodes: diagnosisCodes.split(","),
      };
      switch (type) {
        case EntryType.Check:
          const healthCheckEntry: newHealthCheckEntry = {
            healthCheckRating: Number(healthCheckRating),
            ...newEntry,
            type: EntryType.Check,
          };
          const patientUpdatedWithHealthCheck =
            await patientService.addPatientEntry(id, healthCheckEntry);
          updatePatientAndCleanup(patientUpdatedWithHealthCheck);
          break;
        case EntryType.Occupational:
          const occupationalEntry: newOccupationalHealthcareEntry = {
            employerName,
            ...(sickLeaveStartDate !== "" && sickLeaveEndDate !== ""
              ? {
                  sickLeave: {
                    startDate: sickLeaveEndDate,
                    endDate: sickLeaveStartDate,
                  } as SickLeave,
                }
              : undefined),
            ...newEntry,
            type: EntryType.Occupational,
          };
          const patientUpdatedWithOccupationalEntry =
            await patientService.addPatientEntry(id, occupationalEntry);
          updatePatientAndCleanup(patientUpdatedWithOccupationalEntry);
          break;
        case EntryType.hospital:
          const hospitalEntry: newHospitalEntry = {
            discharge: {
              date: dischargeDate,
              criteria: dischargeCriteria,
            } as Discharge,
            ...newEntry,
            type: EntryType.hospital,
          };
          const patientUpdatedWithHospitalEntry =
            await patientService.addPatientEntry(id, hospitalEntry);
          updatePatientAndCleanup(patientUpdatedWithHospitalEntry);
          break;
        default:
          assertNever(type);
      }
    } else {
      window.alert("Select Entry Type");
    }
  };

  return (
    <div>
      {toggleOpen ? (
        <div
          style={{ display: "flex", flexDirection: "column", ...entryStyle }}
        >
          <h1>Add Entry</h1>
          <div
            style={{ display: "flex", flexDirection: "column", padding: "5px" }}
          >
            <p style={{ margin: "5px", color: "gray", fontSize: 12 }}>Type</p>
            <select
              value={type}
              onChange={(event) => setType(event.target.value)}
            >
              <option value=""> Select Type</option>
              <option value="HealthCheck"> Health Check</option>
              <option value="Hospital"> Hospital Entry</option>
              <option value="OccupationalHealthcare">
                Occupational Healthcare Entry
              </option>
            </select>
          </div>
          <FormInputRow inputName={"Date"} value={date} setValue={setDate} />
          <FormInputRow
            inputName={"Specialist"}
            value={specialist}
            setValue={setSpecialist}
          />
          <FormInputRow
            inputName={"Description"}
            value={description}
            setValue={setDescription}
          />
          <FormInputRow
            inputName={"Diagnosis Codes"}
            value={diagnosisCodes}
            setValue={setDiagnosisCodes}
          />
          {type !== "" ? (
            <FormInputSwitch
              inputType={type as EntryType}
              healthCheckRating={healthCheckRating}
              setHealthcheckRating={setHealthcheckRating}
              dischargeDate={dischargeDate}
              setDischargeDate={setDischargeDate}
              dischargeCriteria={dischargeCriteria}
              setDischargeCriteria={setDischargeCriteria}
              employerName={employerName}
              setEmployerName={setEmployerName}
              sickLeaveStartDate={sickLeaveStartDate}
              setSickLeaveStartDate={setSickLeaveStartDate}
              sickLeaveEndDate={sickLeaveEndDate}
              setSickLeaveEndDate={setSickLeaveEndDate}
            />
          ) : undefined}
          <div style={{ justifyContent: "space-between", width: "100%" }}>
            <Button
              onClick={() => {
                toggle();
                clearInput();
              }}
            >
              Cancel
            </Button>
            <Button onClick={addInput}>Add</Button>
          </div>
        </div>
      ) : (
        <div>
          <Button onClick={toggle}>Add Entry</Button>
        </div>
      )}
    </div>
  );
};

export default AddEntryToPatient;
