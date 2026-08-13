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

export const CalculateExercises = (
  target: number,
  daily_exercises: number[],
): Result => {
  if (isNotNumber(target)) {
    throw new Error("Target must be a number");
  }
  for (const hour of daily_exercises) {
    if (hour < 0 || isNotNumber(hour)) {
      throw new Error("Hours cannot be negative");
    }
  }

  const average =
    daily_exercises.reduce((acc, curr) => acc + curr, 0) /
    daily_exercises.length;

  const description = () => {
    if (average >= target) {
      return "You're doing great, keep it up!";
    } else if (average >= target * 0.75) {
      return "You're mid as most of the people.";
    } else {
      return "You're lazy, don't even try again.";
    }
  };

  const calculateRating = () => {
    if (average >= target) {
      return 3;
    } else if (average >= target * 0.75) {
      return 2;
    } else {
      return 1;
    }
  };

  return {
    periodLength: daily_exercises.length,
    trainingDays: daily_exercises.filter((hour) => hour > 0).length,
    success:
      daily_exercises.reduce((acc, curr) => acc + curr, 0) /
        daily_exercises.length >=
      target,
    rating: calculateRating(),
    ratingDescription: description(),
    target: target,
    average: average,
  };
};

if (process.argv[1] === import.meta.filename) {
  const target = Number(process.argv[2]);
  const daily_exercises = process.argv.slice(3).map(Number);

  console.log(CalculateExercises(target, daily_exercises));
}
