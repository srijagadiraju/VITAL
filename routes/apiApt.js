import express from "express";
import { myDB } from "../db/myDBApt.js";

const router = express.Router();

// Endpoint to get a specific appointment by id
router.get("/get-apt/:id", async (req, res) => {
  const appointmentId = req.params.id;

  try {
    const appointment = await myDB.getAppointmentById(appointmentId);
    if (appointment) {
      res.json(appointment);
    } else {
      res.status(404).json({ error: "Appointment not found" });
    }
  } catch (error) {
    console.error("Error getting appointment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint to update a specific appointment's message by id
router.put("/update-apt/:id", async (req, res) => {
  const appointmentId = req.params.id;
  const { message } = req.body;

  try {
    const updatedAppointment = await myDB.updateAppointmentMessage(
      appointmentId,
      message
    );
    if (updatedAppointment) {
      res.json(updatedAppointment);
    } else {
      res
        .status(404)
        .json({ error: "Appointment not found or no change in message" });
    }
  } catch (error) {
    console.error("Error updating appointment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint to add a new appointment
router.post("/add-apt", async (req, res) => {
  const newAppointment = req.body;

  try {
    const createdAppointment = await myDB.createAppointment(newAppointment);
    if (createdAppointment) {
      res.status(200).json({
        message: "Appointment created successfully",
        aptId: createdAppointment.insertedId,
      });
    } else {
      res.status(400).json({ error: "Failed to create appointment" });
    }
  } catch (error) {
    console.error("Error adding appointment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint to delete a specific appointment by id
router.delete("/delete-apt/:id", async (req, res) => {
  const appointmentId = req.params.id;

  try {
    const result = await myDB.deleteAppointment(appointmentId);
    if (result) {
      res.json({ message: "Appointment deleted successfully" });
    } else {
      res.status(404).json({ error: "Appointment not found" });
    }
  } catch (error) {
    console.error("Error deleting appointment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
