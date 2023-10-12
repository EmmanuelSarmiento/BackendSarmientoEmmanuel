import { Router } from "express";
import { manager } from "../UserManager.js";

const router = Router();

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/user/:idUser", async (req, res) => {
  const { idUser } = req.params;
  const user = await manager.getUserById(+idUser);
  res.render("profile", { user });
});

export default router;
