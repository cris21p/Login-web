const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    try {
      const user = await prisma.user.findUnique({
        where: { email: username }
      });
      if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }
      res.status(200).json({ message: 'Login exitoso', user });
    } catch (error) {
      res.status(500).json({ message: 'Error al iniciar sesión', error });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
};








