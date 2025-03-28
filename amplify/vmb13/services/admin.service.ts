import User from "../models/userRegister";

//update role of users
export const updateUserRole = async (userId: string, role: string) => {
  if (!["pending", "volunteer", "admin", "rejected"].includes(role)) {
    throw new Error("Invalid role.");
  }
  const updatedUser = await User.findByIdAndUpdate(userId, { role }, { new: true });
  if (!updatedUser) {
    throw new Error("User not found.");
  }
  return updatedUser;
};

//get all users by role
export const getUsersByRole = async (role: string) => {
  return await User.find({ role });
};


//delete user
export const deleteUser = async (userId: string) => {
  const deletedUser = await User.findByIdAndDelete(userId);
  if (!deletedUser) {
    throw new Error("User not found.");
  }
  return deletedUser;
};
