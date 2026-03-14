const { loginHandler } = require('../backend/lib/auth-handlers');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  return loginHandler(req, res);
};