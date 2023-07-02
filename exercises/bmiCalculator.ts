const calculateBMI = (height: number, weight: number): number => {
  return weight ** 2 / height;
};
console.log(`Normal (${calculateBMI(180, 74)})`);
