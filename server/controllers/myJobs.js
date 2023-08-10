const { StatusCodes } = require("http-status-codes");
const Job = require("../models/Job");
const { NotFoundError, BadRequestError } = require("../errors");

const getAllMyJobs = async (req, res) => {
  const queryObject = { createdBy: req.user.userId };

  //setup the queryObject with query filters
  const { search, status, jobType, jobLocation, sort } = req.query;
  if (status && status != "all") {
    queryObject.status = status;
  }
  if (jobType && jobType != "all") {
    queryObject.jobType = jobType;
  }
  if (jobLocation && jobLocation != "all") {
    queryObject.jobLocation = jobLocation;
  }
  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }

  let result = Job.find(queryObject);

  //set up sorting
  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "a-z") {
    result = result.sort("position");
  }
  if (sort === "z-a") {
    result = result.sort("-position");
  }

  //set up pagination
  const page = Number(req.query.page);
  const limit = 10;
  const totalJobs = await Job.countDocuments(queryObject).exec();
  const totalPages = Math.ceil(totalJobs / limit);
  const skip = (page - 1) * limit;
  const jobs = await result.skip(skip).limit(limit).exec();

  res.status(StatusCodes.OK).json({ jobs, totalJobs, totalPages });
};

const getSingleMyJob = async (req, res) => {
  const { userId } = req.user;
  const { jobId } = req.params;
  const job = await Job.findOne({ _id: jobId, createdBy: userId })
    .populate("createdBy", "name")
    .exec();
  if (!job) {
    throw new NotFoundError("Job does not exist");
  }
  res.status(StatusCodes.OK).json({ job });
};

const createMyJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

const updateMyJob = async (req, res) => {
  const { userId } = req.user;
  const { jobId } = req.params;
  const { company, status, position } = req.body;
  if (company === "" || position === "") {
    throw new BadRequestError("Company and Position fields cannot be empty");
  }
  const job = {
    company,
    status,
    position,
    createdBy: userId,
    _id: jobId,
  };
  const updatedJob = await Job.findOneAndUpdate(
    { _id: jobId, createdBy: userId },
    job,
    { runValidators: true }
  ).exec();

  if (!updatedJob) {
    throw new NotFoundError("Job does not exist");
  }
  res.status(StatusCodes.OK).json({ job });
};

const deleteMyJob = async (req, res) => {
  const { userId } = req.user;
  const { jobId } = req.params;
  const deletedJob = await Job.findOneAndDelete({
    _id: jobId,
    createdBy: userId,
  }).exec();

  if (!deletedJob) {
    throw new NotFoundError("Job does not exist");
  }
  res.status(StatusCodes.OK).json("Deleted Successfully");
};

module.exports = {
  getAllMyJobs,
  getSingleMyJob,
  createMyJob,
  updateMyJob,
  deleteMyJob,
};
