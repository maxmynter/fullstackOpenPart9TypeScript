import express from "express";
import { calculateBMI } from "./bmiCalculator";
import { calculateExercise } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (isNaN(height) || isNaN(weight)) {
    res.status(400).send({
      error:
        "Malfromatted parameters. Need height and weight. Must be numbers.",
    });
  } else {
    const resultBMI = calculateBMI(height, weight);
    res.send(resultBMI);
  }
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.json({
      error: "parameters missing",
    });
  }

  const dailyExercises = daily_exercises as number[];
  const targetHours = target as number;

  if (dailyExercises.some((num) => isNaN(num)) || isNaN(targetHours)) {
    return res.json({
      error: "malformatted parameters",
    });
  }
  const result = calculateExercise(dailyExercises, targetHours);
  return res.json(result);
});

const PORT = 3004;

app.listen(PORT, () => {
  console.log(`App listening on Port ${PORT}`);
});
