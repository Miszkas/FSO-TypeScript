import express from "express";
const app = express();
app.use(express.json());

import { bmiCalculator } from "./bmiCalculator.ts";
import { CalculateExercises } from "./exerciseCalculator.ts";

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
    res.status(400).send({ error: "malformatted parameters" });
    return;
  }

  const bmi = bmiCalculator(height, weight);
  res.send({
    height,
    weight,
    bmi,
  });
});

app.post("/exercises", (req, res) => {
  const { target, daily_exercises } = req.body as {
    target: unknown;
    daily_exercises: unknown;
  };

  if (target === undefined || daily_exercises === undefined) {
    res.status(400).json({ error: "parameters missing" });
    return;
  } else if (
    typeof target !== "number" ||
    !Array.isArray(daily_exercises) ||
    !daily_exercises.every((h): h is number => typeof h === "number")
  ) {
    res.status(400).json({ error: "malformatted parameters" });
    return;
  }

  const result = CalculateExercises(target, daily_exercises);
  res.send(result);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
