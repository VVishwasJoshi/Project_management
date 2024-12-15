const { Schema, model } = require("mongoose");

const teamSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    teamId: {
      type: String,
      unique: true,
      required: true,
    },
    coordinatorId: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
      default: "Default team description",
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
  },
  { timestamps: true }
);

const Team = model("team", teamSchema);

module.exports = Team;
