const express = require("express");
const router = express.Router();
const depositController = require("../controllers/depositController");

// Get all deposits with optional search and pagination
router.get("/", depositController.getAllDeposits);

// Get a deposit by transaction code
router.get("/:email", depositController.getDepositByEmail);

// Create a new deposit
router.post("/", depositController.createDeposit);

// Update a deposit by ID
router.put("/:id", depositController.updateDeposit);

// Delete a deposit by ID
router.delete("/:id", depositController.deleteDeposit);

module.exports = router;
