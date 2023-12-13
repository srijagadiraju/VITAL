import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import myDB from "./db/userDB.js";

import { fileURLToPath } from "url";
import { dirname } from "path";

import indexRouter from "./routes/index.js";
import apiAptRouter from "./routes/apiApt.js";
import notesRouter from "./routes/notesRoute.js";
import authRouter from "./routes/auth.js";

import passport from "passport";
import LocalStrategy from "passport-local";
import session from "express-session";
import crypto from "crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let app = express();

const myStrategy = new LocalStrategy(async function verify(
  username,
  password,
  cb,
) {
  try {
    const user = await myDB.getUserByUsername(username);

    if (!user) {
      // User not found
      cb(null, false, { message: "Incorrect username or password" });
      return;
    }

    // Computes the hash password from the user input
    crypto.pbkdf2(
      password,
      Buffer.from(user.salt, "hex"),
      310000,
      32,
      "sha256",
      function (err, hashedPassword) {
        if (err) {
          return cb(err);
        }
        if (
          !crypto.timingSafeEqual(
            Buffer.from(user.hashedPassword, "hex"),
            hashedPassword,
          )
        ) {
          // User found but password incorrect
          cb(null, false, { message: "Incorrect username or password" });
          return;
        }

        // User found and authenticated
        cb(null, user);
      },
    );
  } catch (err) {
    cb(err);
  }
});

passport.use(myStrategy);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "front", "dist")));

app.use(
  session({
    secret: "vital session app use",
    resave: false,
    saveUninitialized: false,
  }),
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

app.use(passport.authenticate("session"));

app.use("/", indexRouter);
app.use("/api/apt", apiAptRouter);
app.use("/api/notes", notesRouter);
app.use("/api/auth", authRouter);

export default app;

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/front/dist/index.html"));
});
