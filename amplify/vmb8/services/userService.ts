import { IUser } from '../models/userRegister';
import User from '../models/userRegister';

export const getUsers = async (): Promise<IUser[]> => {
  return await User.find();
};

export const getUserById = async (id: string): Promise<IUser | null> => {
  return await User.findById(id);
};