import express from 'express';
import { getAllUsers, getUser } from '../controllers/userController';

const router = express.Router();

router.get('/users', getAllUsers);
router.get('/users/:id', getUser);


export default router;