import { Router } from 'express';
import { crear, listar } from '../controllers/playerController.js';

const router = Router();

router.get('/', listar);
router.post('/', crear);

export default router;
