import express from "express";

const app = express();
const PORT = 3000;

app.get("/ping", (_req, res) => {
  console.log("Pong");
  res.status(200).send("PONG");
});

app.listen(PORT, () => {
  console.log(`Server Running on PORT: ${PORT}`);
});
