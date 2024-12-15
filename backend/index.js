const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const CoordinatorRouter = require("./routes/co-ordinator");
const StudentRouter = require("./routes/student");
const TeamRouter = require("./routes/team");

const { checkForAuthentication } = require("./middleware/authentication");

const app = express();
const PORT = 8001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(checkForAuthentication("token"));
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));


app.use("/coordinator", CoordinatorRouter);
app.use("/student", StudentRouter);
app.use("/team", TeamRouter);

mongoose
  .connect("mongodb://localhost:27017/Project-Management")
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
