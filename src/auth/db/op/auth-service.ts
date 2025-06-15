import User from "../../../entity/user-schema";
import { comparePassword, generateToken, hashPassword } from "../../../utils";
import { userExistQuery } from "../query/auth-query"

export const signupService = async (email: string, password: string) => {

    const userExist = await userExistQuery(email);
    if (userExist) {
        return ({ status: "Error", error: { message: "User Account Exist with same email" } })
    }
    const user = new User();
    user.email = email
    user.passwordHash = await hashPassword(password)
    await user.save()
    console.log(user)
    return ({ status: "Ok" })
}


export const loginService = async (email: string, password: string) => {

    const user = await userExistQuery(email);
    if (!user) {
        return ({ status: "Error", error: { message: "User Account Exist with same email" } })
    }
    const valid = await comparePassword(password, user.passwordHash);
    if (!valid) return ({ status: "Error", error: { message: 'Invalid credentials' } });

    const token = generateToken(user._id.toString());
    return ({ status: "Ok", data: { token } })
}

