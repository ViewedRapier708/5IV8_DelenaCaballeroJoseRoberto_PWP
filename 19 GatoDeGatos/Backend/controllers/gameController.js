import { createGame, finishGame, getLastGames, getScores } from '../models/gameModel.js';

export const nuevaPartida = async (req, res) => {
  try {
    const { jugador_x_id, jugador_o_id } = req.body;
    if (!jugador_x_id || !jugador_o_id) {
      return res.status(400).json({ mensaje: 'Jugador X y O son obligatorios' });
    }
    if (jugador_x_id === jugador_o_id) {
      return res.status(400).json({ mensaje: 'Debe elegir jugadores distintos' });
    }
    const partida = await createGame({ jugador_x_id, jugador_o_id });
    res.status(201).json({ mensaje: 'Partida creada', partida });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear partida', error: error.message });
  }
};

export const finalizarPartida = async (req, res) => {
  try {
    const { id } = req.params;
    const { ganador } = req.body;
    if (!ganador) {
      return res.status(400).json({ mensaje: 'Ganador requerido' });
    }
    const data = await finishGame({ partidaId: id, ganador });
    res.json({ mensaje: 'Partida finalizada', data });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al finalizar partida', error: error.message });
  }
};

export const puntajes = async (_req, res) => {
  try {
    const data = await getScores();
    res.json(data);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener puntajes', error: error.message });
  }
};

export const partidasRecientes = async (_req, res) => {
  try {
    const data = await getLastGames();
    res.json(data);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener partidas', error: error.message });
  }
};
