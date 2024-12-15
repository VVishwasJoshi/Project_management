const { Schema, model } = require("mongoose");

const fileSchema = new Schema({
  fileName: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  teamId: {
    type: String,
    required: true,
  },
  uploadBy: {
    type: Schema.Types.ObjectId,
    ref: "Student",
  },
  uploadAt: {
    type: Date,
    default: Date.now,
  },
});

const File = model("file", fileSchema);

module.exports = File;
