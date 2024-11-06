import { Request, Response } from 'express';

const asyncWrapper = (fn: (req: Request, res: Response, next: Function) => Promise<void>) => {
    return async (req: Request, res: Response, next: Function) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            next(error);
        }
    };
};

export default asyncWrapper;
