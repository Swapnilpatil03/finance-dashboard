import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface DecodedToken {
  userId: string;
  iat: number;
  exp: number;
}

// Extend Express Request to include `userId`
export interface AuthRequest extends Request {
  userId?: string;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('❌ No token found in Authorization header');
    res.status(401).json({ message: 'Not authorized: No token' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;

    console.log('🛡️ Token decoded:', decoded);
(req as any).userId = decoded.userId;
    // Attach userId to the request object
   

    next();
  } catch (error: any) {
    console.log('❌ Token verification failed:', error.message);
    res.status(401).json({ message: 'Not authorized: Token failed' });
  }
};
