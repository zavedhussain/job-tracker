const express = require("express");
const { getAllJobs, getSingleJob } = require("../controllers/jobs");
const router = express.Router();

router.route("/").get(getAllJobs);
router.route("/:jobId").get(getSingleJob);
module.exports = router;
