import { useEffect, useState } from "react";
import patientService from "../../services/patients";
import { useParams } from "react-router-dom";
import { DiagnoseEntry, Patient } from "../../types";
import DisplayPatient from "./displayPatient";

const PatientPage = ({ diagnoseCodes }: { diagnoseCodes: DiagnoseEntry[] }) => {
  const { patientId } = useParams();
  const [patientData, setPatientData] = useState<Patient | undefined>(
    undefined
  );

  useEffect(() => {
    const getPatientData = async () => {
      if (patientId !== undefined) {
        const returnedPatientData = await patientService.getByID(patientId);
        setPatientData(returnedPatientData);
      }
    };
    getPatientData();
  }, [patientId]);
  return (
    <div>
      {patientData ? (
        <DisplayPatient patient={patientData} diagnoseCodes={diagnoseCodes} />
      ) : (
        <p>No patient Data for id {patientId} </p>
      )}
    </div>
  );
};

export default PatientPage;
