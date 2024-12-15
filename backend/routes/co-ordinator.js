const express = require("express");
const Coordinator = require("../models/co-ordinator");

const router = express();

router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  const coordinatorId = `coord_${Date.now()}`;
  const role = "Coordinator";

  try {
    await Coordinator.create({
      fullName,
      email,
      password, 
      coordinatorId,
      role,
    });
    res
      .status(201)
      .json({ message: "Coordinator registered successfully", coordinatorId });

    // return res.redirect("/# login")
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await Coordinator.matchPasswordAndGenerateToken(
      email,
      password
    );

    // const role = await Coordinator.findOne({ email });

    // if (role === "Coordinator") {
    //   return res.cookie("token", token).redirect("/# co home");
    // }

    res.status(200).json({ token });
  } catch (error) {
    // return res.redirect("signin", {
    //   error: "Incorrect email or password",
    // });
    res.status(400).json({ message: "Invalid email or password" });
  }
});

router.get("/details", async (req, res) => {
  const { id } = req.query;

  try {
    const coordinator = await Coordinator.findById(id);
    if (!coordinator)
      return res.status(404).json({ message: "Coordinator not found" });
    res.status(200).json(coordinator);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
