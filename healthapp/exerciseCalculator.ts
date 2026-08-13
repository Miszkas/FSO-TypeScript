import { isNotNumber } from "./utils/isNotNumber.ts";

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const CalculateExercises = (): Result => {
  const dailyTarget = Number(process.argv[2]);
  const hours = process.argv.slice(3).map(Number);
  if (isNotNumber(dailyTarget)) {
    throw new Error("Daily target must be a number");
  }
  for (const hour of hours) {
    if (hour < 0 || isNotNumber(hour)) {
      throw new Error("Hours cannot be negative");
    }
  }

  const average = hours.reduce((acc, curr) => acc + curr, 0) / hours.length;

  const description = () => {
    if (average >= dailyTarget) {
      return "You're doing great, keep it up!";
    } else if (average >= dailyTarget * 0.75) {
      return "You're mid as most of the people.";
    } else {
      return "You're lazy, don't even try again.";
    }
  };

  const calculateRating = () => {
    if (average >= dailyTarget) {
      return 3;
    } else if (average >= dailyTarget * 0.75) {
      return 2;
    } else {
      return 1;
    }
  };

  return {
    periodLength: hours.length,
    trainingDays: hours.filter((hour) => hour > 0).length,
    success:
      hours.reduce((acc, curr) => acc + curr, 0) / hours.length >= dailyTarget,
    rating: calculateRating(),
    ratingDescription: description(),
    target: dailyTarget,
    average: average,
  };
};

console.log(CalculateExercises());
