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

//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());
// app.use(
//   session({
//     secret: "health",
//     cookie: { secure: false },
//   })
// );
//app.use(passport.initialize());
//app.use(passport.session());

app.use("/", indexRouter);
app.use("/apiApt", apiAptRouter);
app.use("/api/notes", notesRouter);

export default app;
