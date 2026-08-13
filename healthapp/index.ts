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
  const { dailyTarget, hours } = req.body as {
    dailyTarget: unknown;
    hours: unknown;
  };

  if (dailyTarget === undefined || hours === undefined) {
    res.status(400).json({ error: "parameters missing" });
    return;
  } else if (
    typeof dailyTarget !== "number" ||
    !Array.isArray(hours) ||
    !hours.every((h): h is number => typeof h === "number")
  ) {
    res.status(400).json({ error: "malformatted parameters" });
    return;
  }

  const result = CalculateExercises(dailyTarget, hours);
  res.send(result);
});

const PORT = 3030;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
