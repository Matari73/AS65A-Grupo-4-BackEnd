const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token não fornecido' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Falha na autenticação' });

    req.user = decoded;
    next();
  });
};

const adminMasterOnly = (req, res, next) => {
  if (req.user.tipo_acesso !== 'admin_master') {
    return res.status(403).json({ message: 'Acesso negado. Somente admin_master permitido.' });
  }
  next();
};

module.exports = { authMiddleware, adminMasterOnly };
