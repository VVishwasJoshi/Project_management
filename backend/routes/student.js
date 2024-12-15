const express = require("express");
const Student = require("../models/student");

const router = express();

router.post("/signup", async (req, res) => {
  const { fullName, email, password, role } = req.body;

  try {
    await Student.create({
      fullName,
      email,
      password,
      role,
    });
    res.status(201).json({ message: "Student registered successfully" });
    // return res.redirect("/# login")
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await Student.matchPasswordAndGenerateToken(email, password);

    // return res.cookie("token", token).redirect("/# join or create");
    res.status(200).json({ token });
  } catch (error) {
    // return res.redirect("signin", {
    //   error: "Incorrect email or password",
    // });
    res.status(400).json({ message: "Incorrect email or password" });
  }
});

router.get("/details", async (req, res) => {
  const { id } = req.query;
  try {
    const student = await Student.findById(id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
