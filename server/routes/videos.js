import express from 'express';
import {
  addVideo,
  addView,
  deleteVideo,
  getVideo,
  randomVideo,
  subscribedVideo,
  trendingVideo,
  updateVideo,
  getByTags,
  like,
  dislike,
  getBySearch,
} from '../controller/video.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

router.post('/', verifyToken, addVideo);
router.get('/find/:id', getVideo);
router.put('/:id', verifyToken, updateVideo);
router.delete('/:id', verifyToken, deleteVideo);
router.put('/views/:id', addView);
router.get('/random', randomVideo);
router.get('/trends', trendingVideo);
router.get('/subscribed', verifyToken, subscribedVideo);
router.get('/tags', getByTags);
router.get('/search', getBySearch);
router.put('/like/:id', verifyToken, like);
router.put('/dislike/:id', verifyToken, dislike);
export default router;
