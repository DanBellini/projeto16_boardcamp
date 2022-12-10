import { Router } from 'express';
import {listCustormers, findCustormers, insertIntoCustormers, updateCustormers} from '../controllers/customers.controllers.js';

const router = Router();

router.get('/customers', listCustormers);
router.get('/customers/:id', findCustormers);
router.post('/customers', insertIntoCustormers);
router.put('/customers/:id', updateCustormers);

export default router;