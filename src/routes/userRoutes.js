const express = require("express");
const router = express.Router();
const userController = require("./../controllers/userController");

router.get("/", userController.getAllUsers);
router.get("/:email", userController.getUserByEmail);
router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
