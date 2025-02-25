import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Admin credentials (hardcoded)
export const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

// Generate JWT token
export const generateToken = () => {
  return jwt.sign({ role: 'admin' }, process.env.JWT_SECRET!, {
    expiresIn: '30d',
  });
};