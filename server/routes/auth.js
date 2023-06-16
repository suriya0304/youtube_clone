import express from 'express';
import { signup, signin, googleAuth, logout } from '../controller/auth.js';
const router = express.Router();

//CREATE A USER
router.post('/signup', signup);
//SIGN IN A USER
router.post('/signin', signin);

//GOOGLE AUTH
router.post('/google', googleAuth);

router.get('/logout', logout);
export default router;
