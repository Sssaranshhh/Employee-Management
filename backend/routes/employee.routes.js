import express from 'express';
import { getAll, create, update, remove } from '../controllers/employee.controller.js';

const router = express.Router();

router.get('/', getAll);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;
