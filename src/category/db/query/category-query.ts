import Category from "../../../entity/category-schema";

export const categoryExistQuery = async (category_name: string) => {
    return await Category.findOne({
        name: { $regex: `^${category_name}$`, $options: 'i' },
    });
};

export const getUserCategories = async (userId: string) => {
    return await Category.find({ userId });
};

export const getCategoryInfo = async (categoryId: string) => {
    return await Category.findById(categoryId);
};

export const deleteCategoryById = async (categoryId: string) => {
    return await Category.findByIdAndDelete(categoryId);
};

