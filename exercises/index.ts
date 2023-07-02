import express from "express";
import { calculateBMI } from "./bmiCalculator";

const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (isNaN(height) || isNaN(weight)) {
    res
      .status(400)
      .send({
        error:
          "Malfromatted parameters. Need height and weight. Must be numbers.",
      });
  } else {
    const resultBMI = calculateBMI(height, weight);
    res.send(resultBMI);
  }
});

const PORT = 3004;

app.listen(PORT, () => {
  console.log(`App listening on Port ${PORT}`);
});
