import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import indexRouter from "./routes/index.js";
import apiAptRouter from "./routes/apiApt.js";
import notesRouter from "./routes/notesRoute.js";

let app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "front", "dist")));

app.use("/", indexRouter);
app.use("/api/apt", apiAptRouter);
app.use("/api/notes", notesRouter);

export default app;

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/front/dist/index.html"));
});
