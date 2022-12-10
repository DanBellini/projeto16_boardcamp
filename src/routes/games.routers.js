import { Router } from 'express';
import {findGame, insertIntoGame} from '../controllers/games.controllers.js';

const router = Router();

router.get('/games', findGame);
router.post('/games', insertIntoGame);

export default router;