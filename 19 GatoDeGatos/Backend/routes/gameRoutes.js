import { Router } from 'express';
import { finalizarPartida, nuevaPartida, partidasRecientes, puntajes } from '../controllers/gameController.js';

const router = Router();

router.get('/', partidasRecientes);
router.get('/puntajes', puntajes);
router.post('/', nuevaPartida);
router.post('/:id/finalizar', finalizarPartida);

export default router;
