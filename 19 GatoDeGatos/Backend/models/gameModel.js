import pool from '../config/dbconfig.js';

const scoreDelta = (ganador, esX) => {
  if (ganador === 'EMPATE') {
    return { jugadas: 1, ganadas: 0, perdidas: 0, empatadas: 1, puntaje: 1 };
  }
  const gano = (ganador === 'X' && esX) || (ganador === 'O' && !esX);
  const perdio = (ganador === 'X' && !esX) || (ganador === 'O' && esX);
  return {
    jugadas: 1,
    ganadas: gano ? 1 : 0,
    perdidas: perdio ? 1 : 0,
    empatadas: 0,
    puntaje: gano ? 3 : 0
  };
};

export const getScores = async () => {
  const [rows] = await pool.query(
    `SELECT j.id, j.nombre,
            p.partidas_jugadas, p.partidas_ganadas, p.partidas_perdidas,
            p.partidas_empatadas, p.puntaje
     FROM jugadores j
     LEFT JOIN puntajes p ON p.usuario_id = j.id
     ORDER BY p.puntaje DESC, j.id DESC`
  );
  return rows;
};

export const getLastGames = async () => {
  const [rows] = await pool.query(
    `SELECT pa.id, pa.jugador_x_id, pa.jugador_o_id, pa.ganador, pa.terminado_en,
            jx.nombre AS nombre_x, jo.nombre AS nombre_o
     FROM partidas pa
     JOIN jugadores jx ON jx.id = pa.jugador_x_id
     JOIN jugadores jo ON jo.id = pa.jugador_o_id
     ORDER BY pa.id DESC
     LIMIT 10`
  );
  return rows;
};

export const createGame = async ({ jugador_x_id, jugador_o_id }) => {
  const [result] = await pool.query(
    'INSERT INTO partidas (jugador_x_id, jugador_o_id) VALUES (?, ?)',
    [jugador_x_id, jugador_o_id]
  );
  return { id: result.insertId, jugador_x_id, jugador_o_id };
};

export const finishGame = async ({ partidaId, ganador }) => {
  const valid = ['X', 'O', 'EMPATE'];
  if (!valid.includes(ganador)) {
    throw new Error('Ganador invalido');
  }
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const [partidas] = await connection.query(
      'SELECT jugador_x_id, jugador_o_id FROM partidas WHERE id = ?',
      [partidaId]
    );
    if (!partidas.length) {
      throw new Error('Partida no encontrada');
    }
    const partida = partidas[0];

    await connection.query(
      'UPDATE partidas SET ganador = ?, terminado_en = NOW() WHERE id = ?',
      [ganador, partidaId]
    );

    // Garantizar fila en puntajes
    await connection.query(
      'INSERT IGNORE INTO puntajes (usuario_id) VALUES (?), (?)',
      [partida.jugador_x_id, partida.jugador_o_id]
    );

    const deltaX = scoreDelta(ganador, true);
    const deltaO = scoreDelta(ganador, false);

    await connection.query(
      `UPDATE puntajes SET
         partidas_jugadas = partidas_jugadas + ?,
         partidas_ganadas = partidas_ganadas + ?,
         partidas_perdidas = partidas_perdidas + ?,
         partidas_empatadas = partidas_empatadas + ?,
         puntaje = puntaje + ?,
         actualizado_en = NOW()
       WHERE usuario_id = ?`,
      [
        deltaX.jugadas,
        deltaX.ganadas,
        deltaX.perdidas,
        deltaX.empatadas,
        deltaX.puntaje,
        partida.jugador_x_id
      ]
    );

    await connection.query(
      `UPDATE puntajes SET
         partidas_jugadas = partidas_jugadas + ?,
         partidas_ganadas = partidas_ganadas + ?,
         partidas_perdidas = partidas_perdidas + ?,
         partidas_empatadas = partidas_empatadas + ?,
         puntaje = puntaje + ?,
         actualizado_en = NOW()
       WHERE usuario_id = ?`,
      [
        deltaO.jugadas,
        deltaO.ganadas,
        deltaO.perdidas,
        deltaO.empatadas,
        deltaO.puntaje,
        partida.jugador_o_id
      ]
    );

    await connection.commit();
    return { partidaId, ganador };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};
