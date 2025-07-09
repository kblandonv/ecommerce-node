const jwt = require('jsonwebtoken');
const { User } = require('../models');

module.exports = async (req, res, next) => {
  try {
    const header = req.header('Authorization');
    if (!header) return res.status(401).json({ error: 'No token proporcionado' });

    const token = header.replace('Bearer ', '');
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // Opcional: cargar usuario en req
    const user = await User.findByPk(payload.id, { attributes: ['id','name','email','createdAt'] });
    if (!user) return res.status(401).json({ error: 'Usuario no existe' });

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: 'Token inválido' });
  }
};
