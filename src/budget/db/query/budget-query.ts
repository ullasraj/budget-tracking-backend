import mongoose from "mongoose";
import Budget from "../../../entity/budget-schema";
import Expense from "../../../entity/expense-schema";

export const getUserBudgets = async (userId: string) =>
    await Budget.find({ userId });

export const getBudgetById = async (id: string) =>
    await Budget.findById(id);

export const deleteBudget = async (id: string) =>
    await Budget.findByIdAndDelete(id);


export const getMonthWiseBudgets = async (year: number, month: number) =>
    await Budget.find({ year, month });

export const getMonthlyExpenseByCategory = async (userId: string, monthStr: string) => {
    const [year, month] = monthStr.split('-').map(Number);

    const startDate = new Date(year, month - 1, 1); // e.g., 2025-06-01
    const endDate = new Date(year, month, 1);       // e.g., 2025-07-01

    const result = await Expense.aggregate([
        {
            $match: {
                userId: new mongoose.Types.ObjectId(userId),
                date: { $gte: startDate, $lt: endDate },
            },
        },
        {
            $group: {
                _id: "$categoryId",       // Group by category
                total: { $sum: "$amount" }
            },
        },
        {
            $lookup: {
                from: 'categories',
                localField: '_id',
                foreignField: '_id',
                as: 'category'
            },
        },
        {
            $unwind: '$category'
        },
        {
            $project: {
                _id: 0,
                categoryId: '$_id',
                categoryName: '$category.name',
                color: '$category.color',
                total: 1
            }
        }
    ]);

    return result;
};
