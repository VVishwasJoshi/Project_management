const Student = require("../models/student");
const Coordinator = require("../models/co-ordinator");

const isLeader = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const student = await Student.findById(userId);
    if (!student || student.role !== "LEADER") {
      return res.status(400).json({ message: "Access denied" });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const isCoordinator = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const coordinator = await Coordinator.findById(userId);
    if (!coordinator) {
      return res
        .status(403)
        .json({ message: "Access denied. Only Coordinator allowed." });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { isLeader, isCoordinator };
