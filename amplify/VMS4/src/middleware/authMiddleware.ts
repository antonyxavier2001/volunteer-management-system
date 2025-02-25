import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

// API key from environment variables
const API_KEY = process.env.API_KEY || 'admin-api-key';

export const protect = (req: Request, res: Response, next: NextFunction) => {
  // Get API key from header or query parameter
  const apiKey = req.headers['x-api-key'] || req.query.apiKey;
  
  if (!apiKey || apiKey !== API_KEY) {
    return res.status(401).json({ 
      message: 'Unauthorized. Valid API key required.' 
    });
  }
  
  // Key is valid, proceed
  next();
};