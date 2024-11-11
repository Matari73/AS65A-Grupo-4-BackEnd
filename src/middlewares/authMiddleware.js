const jwt = require('jsonwebtoken');

const authMiddleware = (tipo) => (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(403).json({ error: 'Acesso negado' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.tipo_acesso !== tipo && tipo === 'admin_master') {
      return res.status(403).json({ error: 'Acesso restrito' });
    }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
};

module.exports = { authMiddleware };