const { StatusCodes } = require("http-status-codes");
const Job = require("../models/Job");
const { NotFoundError } = require("../errors");

const getAllJobs = async (req, res, next) => {
  const jobs = await Job.find({}).sort("-createdAt");
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

const getSingleJob = async (req, res, next) => {
  const job = await Job.findById(req.params.jobId)
    .populate("createdBy", "name")
    .exec();
  if (!job) {
    throw new NotFoundError("Job does not exist");
  }
  res.status(StatusCodes.OK).json({ job });
};

module.exports = {
  getAllJobs,
  getSingleJob,
};
