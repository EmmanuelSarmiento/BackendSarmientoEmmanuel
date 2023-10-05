export const authMiddleware = (req, res, mext) => {
  const { age } = req.body;
  if (age < 18) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};
