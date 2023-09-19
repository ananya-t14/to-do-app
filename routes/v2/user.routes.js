const { Router } = require("express");
const router = Router();
const userModel = require("../models/v2/user.models");
const { hash, verifyHash } = require("../utils/auth");

router.post("/signup", async (req, res) => {
  try {
    const { name, username, password, email } = req.body;
    if (!name || !username || !password || !email) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const user = await userModel.findOne({ where: { email } });
    if (user) {
      return res.status(404).json({ error: "User already exists" });
    }
    const hashedPassword = await hash(password);
    const newUser = await userModel.create({
      name,
      username,
      password: hashedPassword,
      email,
    });
    return res.status(200).json({ message: `Created user having ${email}` });
  } catch (e) {
    return res.status(500).json({ message: "Server Error" });
  }
});

router.get("/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const user = await userModel.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res
      .status(200)
      .json({ message: `Details for ${username}`, data: user });
  } catch (e) {
    return res.status(500).json({ message: "Server Error" });
  }
});

router.put("/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const updatedData = req.body;
    const [rowsAffected, [updatedUser]] = await userModel.update(updatedData, {
      where: { username },
      returning: true,
    });
    if (rowsAffected === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    if (!updatedDocument) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (e) {
    return res.status(500).json({ message: "Server Error" });
  }
});

router.delete("/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const rowsAffected = await userModel.destroy({ where: { username } });
    if (rowsAffected === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: `User ${username} deleted successfully` });
  } catch (e) {
    return res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
