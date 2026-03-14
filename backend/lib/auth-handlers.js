const prisma = require('./prisma');

async function registerHandler(req, res) {
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
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    return res.status(500).json({ message: 'Error al registrar usuario' });
  }
}

async function loginHandler(req, res) {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email: username }
    });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    return res.json({ message: 'Login exitoso', user });
  } catch (error) {
    return res.status(500).json({ message: 'Error al iniciar sesión' });
  }
}

module.exports = {
  loginHandler,
  registerHandler
};