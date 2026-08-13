import { isNotNumber } from "./utils/isNotNumber";

const bmiCalculator = (): string => {
  const height = process.argv[2];
  const weight = process.argv[3];
  if (isNotNumber(height) || isNotNumber(weight)) {
    return "Invalid input values";
  }

  const heightInM = Number(height) / 100;

  const bmi = Number(weight) / (heightInM * heightInM);

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

console.log(bmiCalculator());
