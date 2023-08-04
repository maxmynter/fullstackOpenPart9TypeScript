import { useState } from "react";
import patientService from "../../services/patients";
import {
  EntryType,
  newHealthCheckEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
  HospitalEntry,
} from "../../types";
import entryStyle from "./commonStyles";
import { Button } from "@mui/material";

const FormInput = ({
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
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [description, setDescription] = useState("");
  const [healthCheckRating, setHealthcheckRating] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");

  const toggle = (): void => {
    setToggleOpen(!toggleOpen);
  };

  const addInput = async () => {
    if (
      !(
        name === EntryType.Check ||
        name === EntryType.Occupational ||
        name === EntryType.hospital
      )
    ) {
      window.alert(
        "Input name must be Valid. Occupational = OccupationalHealthcare, Check = HealthCheck,hospital = Hospital"
      );
    } else {
      if (name !== EntryType.Check) {
        throw new Error("For now only Health Check implemented");
      } else {
        const newEntry: newHealthCheckEntry = {
          type: name,
          date,
          description,
          specialist,
          healthCheckRating: Number(healthCheckRating),
          diagnosisCodes: diagnosisCodes.split(","),
        };
        const updatedPatient = await patientService.addPatientEntry(
          id,
          newEntry
        );
        updateEntries(updatedPatient.entries);
        setName("");
        setDate("");
        setSpecialist("");
        setHealthcheckRating("");
        setDescription("");
        setDiagnosisCodes("");
        setToggleOpen(!toggleOpen);
      }
    }
  };

  return (
    <div>
      {toggleOpen ? (
        <div
          style={{ display: "flex", flexDirection: "column", ...entryStyle }}
        >
          <FormInput inputName={"Name"} value={name} setValue={setName} />
          <FormInput inputName={"Date"} value={date} setValue={setDate} />
          <FormInput
            inputName={"Specialist"}
            value={specialist}
            setValue={setSpecialist}
          />
          <FormInput
            inputName={"Healthcheck Rating"}
            value={healthCheckRating}
            setValue={setHealthcheckRating}
          />
          <FormInput
            inputName={"Description"}
            value={description}
            setValue={setDescription}
          />
          <FormInput
            inputName={"Diagnosis Codes"}
            value={diagnosisCodes}
            setValue={setDiagnosisCodes}
          />
          <div style={{ justifyContent: "space-between", width: "100%" }}>
            <Button onClick={toggle}>Cancel</Button>
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
