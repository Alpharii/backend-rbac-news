import { Request, Response, NextFunction } from 'express';
import jwt from 'jwt-simple';

interface RequestWithUser extends Request {
    user?: any;
}

export const requireRole = (roles: string[]) => {
    return (req: RequestWithUser, res: Response, next: NextFunction): void => {
        const token = req.headers['authorization'];
        if (!token) return res.status(403).json({ error: 'No token provided' }) as unknown as void;

        try {
            const decoded = jwt.decode(token, process.env.JWT_SECRET || 'your_secret_key');
            if (roles.includes(decoded.role)) {
                req.user = decoded;
                return next();
            } else {
                return res.status(403).json({ error: 'Access denied' }) as unknown as void;
            }
        } catch (err) {
            return res.status(403).json({ error: 'Invalid token' }) as unknown as void;
        }
    };
};