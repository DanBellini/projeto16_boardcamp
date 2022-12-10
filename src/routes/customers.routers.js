import { Router } from 'express';
import {listCustomers, findCustomers, insertIntoCustomers, updateCustomers} from '../controllers/customers.controllers.js';
import validationMiddleware from '../middlewares/validation.middleware.js';

const router = Router();

router.get('/customers', listCustomers);
router.get('/customers/:id', findCustomers);
router.post('/customers', validationMiddleware, insertIntoCustomers);
router.put('/customers/:id', validationMiddleware, updateCustomers);

export default router;