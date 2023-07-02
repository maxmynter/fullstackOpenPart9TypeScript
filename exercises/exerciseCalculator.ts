interface ExerciseStats {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  goalsReachedRating: number;
  ratingDescription: string;
}

const calculateExercise = (
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

const result = calculateExercise([3, 0, 2, 4.5, 0, 3, 1], 2);
console.log(result);
