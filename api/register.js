const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { correo, contraseña, fecha_de_nacimiento } = req.body;
    try {
      const user = await prisma.user.create({
        data: {
          email: correo,
          password: contraseña,
          fecha_de_nacimiento: new Date(fecha_de_nacimiento)
        }
      });
      res.status(201).json({ message: 'Usuario registrado correctamente', user });
    } catch (error) {
      if (error.code === 'P2002') {
        res.status(400).json({ message: 'El correo ya está registrado' });
      } else {
        res.status(500).json({ message: 'Error al registrar usuario', error });
      }
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
};














