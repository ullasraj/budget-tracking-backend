import User from '../../../entity/user-schema';

export const userExistQuery = async (email: string) => {
    return await User.findOne({ email });
};

export const userInfoQuery = async (id: string) => {
    return await User.findById(id);
};