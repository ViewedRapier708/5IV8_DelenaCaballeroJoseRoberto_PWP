import { createPlayer, getAllPlayers } from '../models/playerModel.js';

export const listar = async (_req, res) => {
  try {
    const data = await getAllPlayers();
    res.json(data);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener jugadores', error: error.message });
  }
};

export const crear = async (req, res) => {
  try {
    const { nombre } = req.body;
    if (!nombre) {
      return res.status(400).json({ mensaje: 'El nombre es obligatorio' });
    }
    const jugador = await createPlayer({ nombre });
    res.status(201).json({ mensaje: 'Jugador creado', jugador });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear jugador', error: error.message });
  }
};
