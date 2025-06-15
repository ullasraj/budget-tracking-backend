import { userInfoQuery } from "../../../auth/db/query/auth-query";
import { errorResponse, successResponse } from "../../../common-func";
import Category from "../../../entity/category-schema";
import { categoryExistQuery, deleteCategoryById, getCategoryInfo, getUserCategories } from "../query/category-query"

export const createCategoryService = async (name: string, color: string, userId: string) => {

    const categoryExist = await categoryExistQuery(name);
    if (categoryExist) {
        return errorResponse("Category Exist with same Name")
    }
    const user = await userInfoQuery(userId)
    if (user) {
        const category = new Category()
        category.name = name
        category.color = color
        category.userId = user.id

        await category.save()
        return successResponse()
    }
}

export const getCategoryListService = async (userId: string) => {

    const category = await getUserCategories(userId);
    return successResponse(category as any || [])

}

export const updateCategoryService = async (categoryId: string, categoryData: any) => {

    const { name, color } = categoryData
    console.log(categoryId)
    const category = await getCategoryInfo(categoryId);
    if (!category) {
        return errorResponse("Category not found")
    }


    category.name = name
    category.color = color

    await category.save()
    return successResponse()

}

export const deleteCategory = async (category_id: string) => {

    await deleteCategoryById(category_id);

    return successResponse()

}