const express = require("express");
const router = express.Router();
const UserController = require('../controllers/user');
const checkAuth = require('../middleware/check-auth');

router.get("/",checkAuth, UserController.user_get_all);

router.post("/",checkAuth, UserController.users_create_one);

router.get("/:userId",checkAuth, UserController.user_get_one);

router.put("/update/:userId",checkAuth,UserController.user_update_all)

router.patch("/patch/:userId",checkAuth,UserController.user_update_one)

router.delete("/delete/:userId",checkAuth, UserController.user_delete_one)

module.exports = router;