import express from 'express';
import { CustomRequest, verifyToken } from '../middleware';
import { createCategory, deleteCategoryContoller, getCategoryListContoller, updateCategory } from './db/op/category-controller';

const router = express.Router();

router.post('/create-category', verifyToken, createCategory);
router.get('/category', verifyToken, getCategoryListContoller);
router.delete('/category/:categoryId', verifyToken, deleteCategoryContoller);
router.put('/category/:categoryId', verifyToken, updateCategory);

export default router;
