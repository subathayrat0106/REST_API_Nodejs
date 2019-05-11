const express = require("express");
const router = express.Router();
const CompanyController = require("../controllers/company")

router.get("/", CompanyController.company_get_all);

router.post("/", CompanyController.company_create_one);

router.get("/:companyId", CompanyController.company_get_one);

router.put("/update/:companyId",CompanyController.company_update_all);

router.patch("/patch/:companyId",CompanyController.company_update_one );

router.delete("/delete/:companyId", CompanyController.company_delete_one);

module.exports = router;