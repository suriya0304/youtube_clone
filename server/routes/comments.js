import express from 'express';
import {
  postComment,
  deleteComment,
  getAllComment,
} from '../controller/comment.js';
import { verifyToken } from '../verifyToken.js';
const router = express.Router();

//ADD COMMENT
router.post('/', verifyToken, postComment);
router.delete('/:id', verifyToken, deleteComment);
router.get('/:videoId', getAllComment);

export default router;
