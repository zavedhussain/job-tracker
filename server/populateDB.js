require("dotenv").config();
const mongoose = require("mongoose");
const data = require("./data.json");
const Job = require("./models/Job");

const connectDB = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
};

const populate = async () => {
  try {
    const createdBy = "64ce5631ed07f706b8d0bfc1";
    const newData = data.map((item) => {
      return { ...item, createdBy };
    });
    await connectDB(process.env.DB_URI);
    await Job.create(newData);
    console.log("Success !!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

populate();
