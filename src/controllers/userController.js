exports.getMe = (req, res) => {
  // req.user fue cargado en el middleware
  res.json({ user: req.user });
};
