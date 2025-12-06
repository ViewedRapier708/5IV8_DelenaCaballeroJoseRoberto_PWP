import pool from '../config/dbconfig.js';

export const getAllPlayers = async () => {
  const [rows] = await pool.query('SELECT id, nombre, creado_en FROM jugadores ORDER BY id DESC');
  return rows;
};

export const createPlayer = async ({ nombre }) => {
  const [result] = await pool.query(
    'INSERT INTO jugadores (nombre) VALUES (?)',
    [nombre]
  );
  return { id: result.insertId, nombre };
};
