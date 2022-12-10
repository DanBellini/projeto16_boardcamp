import { Router } from 'express';
import {listRentals, insertIntoRentals, finishRentals, deleteRentals} from '../controllers/rentals.controllers.js';

const router = Router();

router.get('/rentals', listRentals);
router.post('/rentals', insertIntoRentals);
router.post('/rentals/:id/return', finishRentals);
router.delete('/rentals/:id', deleteRentals);

export default router;