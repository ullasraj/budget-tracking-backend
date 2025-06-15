import express from 'express';
import { verifyToken } from '../middleware';
import { create, createExpenseContoller, getAll, getMonthBudgets, getMonthlyExpenseController, getOne, remove, update } from './db/op/budget-controller';

const router = express.Router();

router.post('/create-budget', verifyToken, create);
router.get('/get-all-budget', verifyToken, getAll);
router.get('/budgets/:id', verifyToken, getOne);
router.put('/budgets/:id', verifyToken, update);
router.delete('/budgets/:id', verifyToken, remove);
router.get('/get-month-budget', verifyToken, getMonthBudgets);
router.get('/get-month-expense', verifyToken, getMonthlyExpenseController);

router.post('/create-expense', verifyToken, createExpenseContoller);
export default router;
