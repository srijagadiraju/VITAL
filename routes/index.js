import express from "express";
import myDB from "../db/myMongoDB.js";

const router = express.Router();

router.get("/api/appointments", async (req, res) => {
  try {
    const appointments = await myDB.getAppointments();
    res.json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
});

export default router;
