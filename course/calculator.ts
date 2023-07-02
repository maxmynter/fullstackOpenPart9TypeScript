export type Operation = "multiply" | "add" | "divide";

export const calculator = (a: number, b: number, op: Operation) => {
  switch (op) {
    case "multiply":
      return a * b;
    case "add":
      return a + b;
    case "divide":
      return a / b;
    default:
      throw new Error("Operation unkown. Use multiply, divide, or add.");
  }
};

try {
  console.log(calculator(1, 5, "divide"));
} catch (error: unknown) {
  let errorMessage = "Something went wrong: ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
