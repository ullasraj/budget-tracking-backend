import { userInfoQuery } from '../../../auth/db/query/auth-query';
import { categoryExistQuery, getCategoryInfo } from '../../../category/db/query/category-query';
import { errorResponse, successResponse } from '../../../common-func';
import Budget from '../../../entity/budget-schema';
import Expense from '../../../entity/expense-schema';
import {
    getUserBudgets,
    getBudgetById,
    deleteBudget,
    getMonthWiseBudgets,
    getMonthlyExpenseByCategory,
} from '../query/budget-query';

export const handleCreateBudget = async (budgetData: any, userId: string) => {

    const { month, amount, categoryId } = budgetData
    console.log(budgetData)
    const user = await userInfoQuery(userId)
    if (user) {
        const monthAndYear = month.split("-");
        const budget = new Budget()
        budget.month = monthAndYear[1]
        budget.year = monthAndYear[0]
        budget.amount = amount
        budget.categoryId = categoryId
        budget.userId = user._id
        console.log(budget)
        await budget.save()
        return successResponse()
    }
};

export const handleGetBudgets = async (userId: string) => {
    const budgets = await getUserBudgets(userId);
    return successResponse(budgets)
};

export const handleGetBudget = async (id: string) => {
    const budget = await getBudgetById(id);
    return successResponse(budget)
};

export const handleUpdateBudget = async (id: string, updates: any) => {
    const { month, amount } = updates
    const budget = await getBudgetById(id);
    if (budget) {
        budget.month = month
        budget.amount = amount
        await budget.save()
        return successResponse()
    } else {
        return errorResponse("Budget Nit exist")
    }


};

export const handleDeleteBudget = async (id: string) => {
    await deleteBudget(id);
    return successResponse()
};

export const handleGetMonthBudget = async (month: string) => {
    const monthAndYear = month.split("-");
    const budget = await getMonthWiseBudgets(Number(monthAndYear[0]), Number(monthAndYear[1]));
    console.log(month, budget)
    return successResponse(budget || [])
};


export const addExpense = async (amount: number, categoryId: string, userId: string, date: any) => {

    const user = await userInfoQuery(userId)
    const category = await getCategoryInfo(categoryId);
    if (!user) {
        return errorResponse("User Not Exist")
    }

    if (!category) {
        return errorResponse("Category Not Exist")
    }
    const expense = new Expense();
    expense.amount = amount
    expense.categoryId = category?._id
    expense.userId = user?._id
    expense.date = date

    await expense.save();
    return successResponse()

}

export const getMonthlyExpenses = async(month: string,userId:string)=>{
    const expense=await getMonthlyExpenseByCategory(userId,month)
    return successResponse(expense)
}