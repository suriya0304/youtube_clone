import express from 'express';
import {
  updateUser,
  deleteUser,
  getUser,
  subscribeUser,
  unsubscribeUser,
  like,
  dislike,
} from '../controller/user.js ';
import { verifyToken } from '../verifyToken.js';

export const router = express.Router();

//UPDATE USER
router.put('/:id', verifyToken, updateUser);

//DELETE USER
router.delete('/:id', verifyToken, deleteUser);

//GET A USER
router.get('/:id', getUser);

//SUBSCRIBE A USER
router.put('/sub/:id', verifyToken, subscribeUser);

//UNSUBSCRIBE A USER
router.put('/unsub/:id', verifyToken, unsubscribeUser);

//LIKE A VIDEO
router.put('/like/:id', verifyToken, like);

//DISLIKE A VIDEO
router.put('/dislike/:id', verifyToken, dislike);

export default router;
