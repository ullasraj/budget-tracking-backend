import { Request, Response } from 'express'
import { createCategoryService, deleteCategory, getCategoryListService, updateCategoryService } from './category-service';
import { CustomRequest } from '../../../middleware';
import { isErrorResponse } from '../../../common-func';

export const createCategory = async (req: CustomRequest, res: Response) => {
    try {
        const { name, color } = req.body;
        const userid = req.user?.id
        console.log(userid)
        if (userid) {
            const response = await createCategoryService(name, color, userid);
            console.log(response)
            if (isErrorResponse(response)) {
                res.status(401).json(response.error);
                return;
            }

            res.status(200).json(response);
        }

    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateCategory = async (req: CustomRequest, res: Response) => {
    try {
        const { name, color,  } = req.body;
        const categoryId=req.params.categoryId
        console.log(req.body)
        const response = await updateCategoryService(categoryId, req.body);

        if (isErrorResponse(response)) {
            res.status(401).json(response.error);
            return;
        }

        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const deleteCategoryContoller = async (req: CustomRequest, res: Response) => {
    try {
        const { categoryId } = req.params;
        const userid = req.user
        const response = await deleteCategory(categoryId);

        if (isErrorResponse(response)) {
            res.status(401).json(response.error);
            return;
        }

        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const getCategoryListContoller = async (req: CustomRequest, res: Response) => {
    try {

        const userid = req.user?.id
        if (userid) {
            const response = await getCategoryListService(userid);

            if (isErrorResponse(response)) {
                res.status(401).json(response.error);
                return;
            }

            res.status(200).json(response);
        }

    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};