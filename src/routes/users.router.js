import { Router } from "express";
import { usersManager } from "../managers/userManager.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const users = await usersManager.findAll();
    res.status(200).json({ message: "Users", users });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:idUser", async (req, res) => {
  const { idUser } = req.params;
  try {
    const users = await usersManager.findById(idUser);
    res.status(200).json({ message: "Users", users });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:idUser", async (req, res) => {
  const { idUser } = req.params;
  try {
    await usersManager.deleteOne(idUser);
    res.status(200).json({ message: "Users deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  const { first_name, last_name, email, password, age } = req.body;
  if (!first_name || !last_name || !email || !password || !age) {
    return res.status(400).json({ message: "Some data is missing" });
  }
  try {
    const createdUsers = await usersManager.createOne(req.body);
    res.status(200).json({ message: "Users created", user: createdUsers });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
export default router;
