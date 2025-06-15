
import { Request, Response } from 'express';
import { loginService, signupService } from './auth-service';

export const signupController = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ status: 'Error', message: 'Email and password are required' });
    }

    try {
        const result = await signupService(email, password);
        res.status(201).send(result);
    } catch (error: any) {
        res.status(400).json({ status: 'Error', message: error.message });
    }
};

export const loginController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        console.log(req.body)
        const token = await loginService(email, password);

        if (token?.status === 'Error') {
            res.status(401).json(token.error); // ✅
        }

        res.status(200).json(token); // ✅
    } catch (err) {
        res.status(500).json({ message: 'Server error' }); // ✅
    }
};

