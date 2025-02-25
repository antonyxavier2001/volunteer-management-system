import { RequestHandler } from "express";
import { updateUserRole, getUsersByRole, deleteUser } from "../services/admin.service";

//approve or Reject User (Update Role)
export const approveOrRejectUser: RequestHandler = async (req, res) => {
  try {
    const { userId, role } = req.body;
    const updatedUser = await updateUserRole(userId, role);
    res.status(200).json({ message: `User role updated to ${role}`, user: updatedUser });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

//get Users by Role
export const getUsers: RequestHandler = async (req, res) => {
  try {
    const { role } = req.params;
    const users = await getUsersByRole(role);
    res.status(200).json({ count: users.length, users });
  } catch (error: any) {
    res.status(500).json({ message: "Server error." });
  }
};

//delete a User
export const removeUser: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.params;
    const deletedUser = await deleteUser(userId);
    res.status(200).json({ message: "User deleted successfully.", user: deletedUser });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};
