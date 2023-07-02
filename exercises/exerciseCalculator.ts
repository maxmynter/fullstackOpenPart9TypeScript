export interface ExerciseStats {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  goalsReachedRating: number;
  ratingDescription: string;
}

interface calculateExercise {
  exerciseHours: number[];
  targetHours: number;
}

const parseArgumentsExercise = (args: string[]): calculateExercise => {
  if (args.length < 4)
    throw new Error(
      "Too few Arguments, target hours and at least one day of exercises"
    );

  return {
    exerciseHours: [
      ...args.slice(3).map((value: any) => {
        if (!isNaN(Number(value))) return Number(value);
        else throw new Error("Provided variables must be numbers");
      }),
    ],
    targetHours: Number(args[2]),
  };
};

export const calculateExercise = (
  exerciseHours: number[],
  target: ExerciseStats["target"]
): ExerciseStats => {
  const average =
    exerciseHours.reduce((acc, curr) => acc + curr, 0) / exerciseHours.length;
  const success = average >= target;
  const ratingDescription = "1 if failed to reach, 2 if met, 3 if outperformed";
  const goalsReachedRating = success ? (average == target ? 2 : 3) : 1;

  return {
    periodLength: exerciseHours.length,
    trainingDays: exerciseHours.filter((num) => num > 0).length,
    target,
    average,
    success,
    goalsReachedRating,
    ratingDescription,
  };
};

try {
  const { exerciseHours, targetHours } = parseArgumentsExercise(process.argv);
  const result = calculateExercise(exerciseHours, targetHours);
  console.log(result);
} catch (error: unknown) {
  let errorMessage = "Something failed";
  if (error instanceof Error) {
    errorMessage += "Error is: " + error.message;
  }
  console.log(errorMessage);
}
