import { pool } from './_lib/db.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Metodo no permitido' });
  }

  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ message: 'Faltan credenciales' });
  }

  try {
    const result = await pool.query(
      'SELECT id, email, password, fecha_de_nacimiento, "createdAt" FROM "User" WHERE email = $1 LIMIT 1',
      [username]
    );

    const user = result.rows[0];

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    return res.status(200).json({
      message: 'Login exitoso',
      user: {
        id: user.id,
        email: user.email,
        fecha_de_nacimiento: user.fecha_de_nacimiento,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error al iniciar sesion' });
  }
}