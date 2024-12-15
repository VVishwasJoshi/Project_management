const express = require("express");
const Team = require("../models/team");
const { isLeader, isCoordinator } = require("../middleware/authorization");

const router = express();

router.post("/create", isLeader, async (req, res) => {
  const { name, coordinatorId, body } = req.body;
  const teamId = `team_${Date.now()}`;

  try {
    const team = await Team.create({
      name,
      coordinatorId,
      teamId,
      body,
      members: [],
    });
    res.status(201).json({
      message: "Team Created Succesfully",
      // teamId,
      team,

      // return res.redirect("/# st home")
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post("/join", async (req, res) => {
  const { teamId } = req.body;
  const studentId = req.user.id;

  try {
    const team = await Team.findOne({ teamId });

    if (!team) {
      return res.status(400).json({ message: "Team not found" });
    }

    if (team.members.includes(studentId)) {
      return res.status(400).json({ message: "Already in group" });
    }

    team.members.push(studentId);
    team.save();

    // return res.redirect("/# st home")

    res.status(200).json({ message: "Team Join Successfull", team });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// router.get("/all", async (req, res) => {
//   try {
//     const teams = await Team.find({
//       coordinatorId: req.user.coordinatorId,
//     }).populate("members");
//     res.status(200).json({ teams });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

router.get("/all", isCoordinator, async (req, res) => {
  const { coordinatorId } = req.user;
  try {
    const teams = await Team.find({ coordinatorId })
      .populate("members", "fullName email")
      .lean();
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/homepage", async (req, res) => {
  let teamId;
  if (req.user && (req.user.role === "LEADER" || req.user.role === "MEMBER")) {
    teamId = req.user.teamId;
  } else if (req.query.teamId) {
    teamId = req.query.teamId;
  }

  try {
    const team = await Team.findOne({ teamId }).populate(
      "members",
      "fullName email"
    );
    if (!team) return res.status(404).json({ message: "Team not found" });

    const files = await File.find({ teamId }).populate(
      "uploadBy",
      "fullName email"
    );

    res.status(200).json({ team, files });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching team details", error: error.message });
  }
});

router.get("/");

module.exports = router;
