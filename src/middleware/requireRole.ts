import { Response, NextFunction } from 'express';
import jwt from 'jwt-simple';

export const requireRole = (roles: string[]) => {
    return (req: any, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ error: 'No token provided' });

    try {
        const decoded = jwt.decode(token, process.env.JWT_SECRET || 'your_secret_key');
        if (roles.includes(decoded.role)) {
        req.user = decoded;
        next();
        } else {
        res.status(403).json({ error: 'Access denied' });
        }
    } catch (err) {
        res.status(403).json({ error: 'Invalid token' });
    }
    };
};
