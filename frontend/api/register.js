import { pool } from './_lib/db.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Metodo no permitido' });
  }

  const { correo, contraseña, fecha_de_nacimiento } = req.body || {};

  if (!correo || !contraseña || !fecha_de_nacimiento) {
    return res.status(400).json({ message: 'Faltan datos requeridos' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO "User" (email, password, fecha_de_nacimiento) VALUES ($1, $2, $3) RETURNING id, email, fecha_de_nacimiento, "createdAt"',
      [correo, contraseña, fecha_de_nacimiento]
    );

    return res.status(201).json({
      message: 'Usuario registrado correctamente',
      user: result.rows[0]
    });
  } catch (error) {
    if (error.code === '23505') {
      return res.status(400).json({ message: 'El correo ya esta registrado' });
    }

    return res.status(500).json({ message: 'Error al registrar usuario' });
  }
}