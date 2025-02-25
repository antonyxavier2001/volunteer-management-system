import express from "express";
import { approveOrRejectUser, getUsers, removeUser } from "../controllers/admin.controller";

const router = express.Router();

router.put("/update-role", approveOrRejectUser);
router.get("/users/:role", getUsers);
router.delete("/users/:userId", removeUser);

export default router;
