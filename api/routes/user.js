const express = require("express");
const router = express.Router();
const UserController = require('../controllers/user')

router.get("/", UserController.user_get_all);

router.post("/", UserController.users_create_one);

router.get("/:userId", UserController.user_get_one);

router.put("/update/:userId",UserController.user_update_all)

router.patch("/patch/:userId",UserController.user_update_one)

router.delete("/delete/:userId", UserController.user_delete_one)

module.exports = router;