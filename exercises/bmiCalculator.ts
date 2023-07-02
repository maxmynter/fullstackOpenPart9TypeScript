interface bmi {
  height: number;
  weight: number;
}

const parseArgumentsBMI = (args: string[]): bmi => {
  return {
    height: Number(args[2]),
    weight: Number(args[3]),
  };
};

const calculateBMI = (height: number, weight: number): string => {
  const bmi = weight / height ** 2;
  if (bmi < 18.5) return `Underweight, BMI: ${bmi}`;
  if (bmi > 25) return `Overweight, BMI: ${bmi}`;
  return `Normal Weight, BMI: ${bmi}`;
};

try {
  const { height, weight } = parseArgumentsBMI(process.argv);
  const result = calculateBMI(height, weight);
  console.log(result);
} catch (error) {
  console.log(error);
}
