import { Request, Response } from 'express';
import { addExpense, getMonthlyExpenses, handleCreateBudget, handleDeleteBudget, handleGetBudget, handleGetBudgets, handleGetMonthBudget, handleUpdateBudget } from './budget-service';
import { CustomRequest } from '../../../middleware';
import { isErrorResponse } from '../../../common-func';

export const create = async (req: CustomRequest, res: Response) => {
    try {
        const userid = req.user?.id
        if (userid) {
            const response = await handleCreateBudget(req.body, userid);
            if (isErrorResponse(response)) {
                res.status(401).json(response.error);
                return;
            }
            res.status(201).json(response);


        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Failed to create budget' });
    }

};

export const getAll = async (req: CustomRequest, res: Response) => {
    try {
        const userid = req.user?.id
        if (userid) {
            const response = await handleGetBudgets(userid);
            if (isErrorResponse(response)) {
                res.status(401).json(response.error);
                return;
            }
            res.status(201).json(response);
        }

    } catch {
        res.status(500).json({ message: 'Failed to fetch budgets' });
    }
};

export const getOne = async (req: CustomRequest, res: Response) => {
    try {
        const response = await handleGetBudget(req.params.id);
        if (isErrorResponse(response)) {
            res.status(401).json(response.error);
            return;
        }
        res.status(201).json(response);
    } catch {
        res.status(500).json({ message: 'Error getting budget' });
    }
};

export const update = async (req: CustomRequest, res: Response) => {
    try {
        const response = await handleUpdateBudget(req.params.id, req.body);
        if (isErrorResponse(response)) {
            res.status(401).json(response.error);
            return;
        }
        res.status(201).json(response);
    } catch {
        res.status(500).json({ message: 'Error updating budget' });
    }
};

export const remove = async (req: CustomRequest, res: Response) => {
    try {
        const response = await handleDeleteBudget(req.params.id);
        if (isErrorResponse(response)) {
            res.status(401).json(response.error);
            return;
        }
        res.status(201).json(response);
    } catch {
        res.status(500).json({ message: 'Error deleting budget' });
    }
};

export const getMonthBudgets = async (req: CustomRequest, res: Response) => {
    try {
        console.log("get month")
        const { month } = req.query
        console.log(month)
        if (month) {
            const response = await handleGetMonthBudget(month as string);
            if (isErrorResponse(response)) {
                res.status(401).json(response.error);
                return;
            }
            res.status(201).json(response);
        }

    } catch {
        res.status(500).json({ message: 'Error getting budget' });
    }
};

export const createExpenseContoller = async (req: CustomRequest, res: Response) => {
    try {
        const userid = req.user?.id
        const { amount, categoryId, date } = req.body
        if (userid) {
            const response = await addExpense(amount, categoryId, userid, date);
            if (isErrorResponse(response)) {
                res.status(401).json(response.error);
                return;
            }
            res.status(201).json(response);
        }

    } catch {
        res.status(500).json({ message: 'Failed to add expense' });
    }
};

export const getMonthlyExpenseController = async (req: CustomRequest, res: Response) => {
    try {
        const userid = req.user?.id
        const { month } = req.query
        if (userid && month) {
            const response = await getMonthlyExpenses(month as string, userid);
            if (isErrorResponse(response)) {
                res.status(401).json(response.error);
                return;
            }
            res.status(201).json(response);
        }

    } catch {
        res.status(500).json({ message: 'Failed to add expense' });
    }
};
