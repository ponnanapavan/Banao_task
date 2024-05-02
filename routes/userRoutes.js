import express from 'express'
import { login, signup, upDatePassword } from '../controller/userController.js';
import protectRoute from '../protectRoutes.js';

const router=express.Router();

router.post('/signup',signup)
router.post('/login',login);
router.post('/updatepassword', protectRoute, upDatePassword)


export default router;