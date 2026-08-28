import express from "express";
const app = express();

app.use(express.json());

const requestLogger = (
  request: express.Request,
  _response: express.Response,
  next: express.NextFunction,
) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

app.use(requestLogger);

app.get("/api/ping", (_req, res) => {
  console.log("pinged");
  res.send("pong");
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
