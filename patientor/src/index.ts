import express from "express";
import cors from "cors";
import diagnoseRouter from "./routes/diagnoses";
import patientRouter from "./routes/patients";

const app = express();
const PORT = 3001;

// Use CORS middleware
app.use(cors({ origin: ["http://localhost:3000", "http://localhost:3001"] }));

app.use("/api/diagnoses", diagnoseRouter);
app.use("/api/patients", patientRouter);

app.get("/api/ping", (_req, res) => {
  console.log("Pong");
  res.status(200).send("PONG");
});

app.listen(PORT, () => {
  console.log(`Server Running on PORT: ${PORT}`);
});
