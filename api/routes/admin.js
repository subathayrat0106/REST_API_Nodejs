const express = require("express");
const router = express.Router();

const AdminController = require('../controllers/admin');
//const checkAuth = require('../middleware/check-auth');

router.post("/signup", AdminController.admin_signup);

router.post("/login", AdminController.admin_login);

router.delete("/delete/:adminId", AdminController.admin_delete);

module.exports = router;