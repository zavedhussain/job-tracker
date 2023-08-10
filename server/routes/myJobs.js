const express = require("express");
const {
  getAllMyJobs,
  createMyJob,
  getSingleMyJob,
  updateMyJob,
  deleteMyJob,
} = require("../controllers/myJobs");
const testUser = require("../middleware/testUser");
const router = express.Router();

router.route("/").get(getAllMyJobs).post(testUser, createMyJob);
router
  .route("/:jobId")
  .get(getSingleMyJob)
  .patch(testUser, updateMyJob)
  .delete(testUser, deleteMyJob);

module.exports = router;
