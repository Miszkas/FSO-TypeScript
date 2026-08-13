interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const CalculateExercises = (hours: number[], dailyTarget: number) => {
  for (const hour of hours) {
    if (hour < 0) {
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

console.log(CalculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
