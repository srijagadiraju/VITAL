import express from "express";
import passport from "passport";
import crypto from "crypto";
import myDB from "../db/userDB.js";

const router = express.Router();

router.post("/api/login/password", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: info.message });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({ message: "Logged in successfully" });
    });
  })(req, res, next);
});

router.get("/api/getUser", function (req, res) {
  console.log("getUser", req.user);
  res.status(200).json({ username: req.user?.username });
});

router.post("/api/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.status(200).json({ username: null, msg: "Logged out", ok: true });
  });
});

router.post("/api/signup", async function (req, res, next) {
  console.log("**** signup", req.body);

  const { username, password, email } = req.body;

  // Check if the user with the same username or email already exists
  const existingUser = await myDB.getUserByUsername(username);
  const existingEmail = await myDB.getUserByEmail(email);

  if (existingUser) {
    return res.status(400).json({ ok: false, msg: "Username already exists" });
  }

  if (existingEmail) {
    return res.status(400).json({ ok: false, msg: "Email already exists" });
  }

  var salt = crypto.randomBytes(16);
  crypto.pbkdf2(
    password,
    salt,
    310000,
    32,
    "sha256",
    async function (err, hashedPassword) {
      if (err) {
        return next(err);
      }

      // Save the user with the email
      const insertResponse = await myDB.insertUser({
        email,
        username,
        hashedPassword: hashedPassword.toString("hex"),
        salt: salt.toString("hex"),
      });

      console.log("inserted", insertResponse);

      res.status(200).json({ ok: true, msg: "Signed up successfully" });
    },
  );
});

export default router;
