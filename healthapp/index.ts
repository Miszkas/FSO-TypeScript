import express from "express";
const app = express();

import { bmiCalculator } from "./bmiCalculator.ts";

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
    res.status(400).send("malformatted parameters");
    return;
  }

  const bmi = bmiCalculator(height, weight);
  res.send({
    height,
    weight,
    bmi,
  });
});

const PORT = 3030;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
