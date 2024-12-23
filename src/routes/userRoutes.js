const express = require("express");
const router = express.Router();
const userController = require("./../controllers/userController");

router.get("/", userController.getAllUsers);
router.get("/:email", userController.getUserByEmail);
router.post("/check", userController.checkUserExists);
router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:uid", userController.deleteUser);


router.get("/checkAdmin/:email", userController.checkAdmin);

module.exports = router;
