import { Router } from 'express';
import {listOfCategories, insertIntoCategories} from '../controllers/categories.controllers.js'

const router = Router();

router.get('/categories', listOfCategories);
router.post('/categories', insertIntoCategories);

export default router;