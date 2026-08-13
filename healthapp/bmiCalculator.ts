import { isNotNumber } from "./utils/isNotNumber.ts";

const bmiCalculator = (height: number, weight: number): string => {
  if (isNotNumber(height) || isNotNumber(weight)) {
    return "Invalid input values";
  }

  const heightInM = height / 100;

  const bmi = weight / (heightInM * heightInM);

  switch (true) {
    case bmi < 16:
      return "Underweight (Severe thinness)";
    case bmi >= 16 && bmi < 17:
      return "Underweight (Moderate thinness)";
    case bmi >= 17 && bmi < 18.5:
      return "Underweight (Mild thinness)";
    case bmi >= 18.5 && bmi < 25:
      return "Normal range";
    case bmi >= 25 && bmi < 30:
      return "Overweight (Pre-obese)";
    case bmi >= 30 && bmi < 35:
      return "Obese (Class I)";
    case bmi >= 35 && bmi < 40:
      return "Obese (Class II)";
    case bmi >= 40:
      return "Obese (Class III)";
    default:
      return "Invalid BMI value";
  }
};

if (process.argv[1] === import.meta.filename) {
  const height = Number(process.argv[2]);
  const weight = Number(process.argv[3]);
  console.log(bmiCalculator(height, weight));
}

export { bmiCalculator };
