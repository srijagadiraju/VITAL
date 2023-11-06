import express from "express";
import myDB from "../db/myMongoDB.js";

const router = express.Router();

// Create a new user
router.post("/register", async (req, res) => {
  const userData = req.body; // Assuming user data is sent in the request body
  try {
    const success = await myDB.createUser(userData);
    if (success) {
      res.status(201).json({ message: "User created successfully" });
    } else {
      res.status(500).json({ error: "Failed to create user" });
    }
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
});

// Get user by email
router.get("/users/:email", async (req, res) => {
  const email = req.params.email;
  try {
    const user = await myDB.getUserByEmail(email);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error getting user by email:", error);
    res.status(500).json({ error: "Failed to get user by email" });
  }
});

// Update user by email
router.put("/users/:email/update", async (req, res) => {
  const email = req.params.email;
  const updatedUserData = req.body; // New user data to be updated
  try {
    const success = await myDB.updateUserByEmail(email, updatedUserData);
    if (success) {
      res.json({ message: "User updated successfully" });
    } else {
      res.status(500).json({ error: "Failed to update user" });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user" });
  }
});

// Delete user by email
router.delete("/users/:email/delete", async (req, res) => {
  const email = req.params.email;
  try {
    const success = await myDB.deleteUserByEmail(email);
    if (success) {
      res.json({ message: "User deleted successfully" });
    } else {
      res.status(500).json({ error: "Failed to delete user" });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

export default router;
