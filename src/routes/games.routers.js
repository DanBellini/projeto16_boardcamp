import { Router } from 'express';
import {findGame, insertIntoGame} from '../controllers/games.controllers.js';

const router = Router();

router.get('/categories', findGame);
router.post('/categories', insertIntoGame);

export default router;