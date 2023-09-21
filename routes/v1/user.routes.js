const { Router } = require("express");
const router = Router();
const UserController = require("../../controllers/v1/user-controller");

router.post("/signup", UserController.addUser);

router.get("/:username", UserController.getUser);

router.put("/:username", UserController.updateUser);

router.delete("/:username", UserController.deletedUser);

module.exports = router;