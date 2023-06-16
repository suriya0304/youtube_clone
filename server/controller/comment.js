import Comments from '../models/Comments.js';
import Video from '../models/Video.js';

export const postComment = async (req, res, next) => {
  try {
    const comment = new Comments({ ...req.body, userId: req.user.id });
    const savedComment = await comment.save();
    res.status(200).send(savedComment);
  } catch (err) {
    res.send(err);
  }
};
export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comments.findById(req.params.id);
    const video = await Video.findById(comment.videoId);
    console.log('commentID is ', comment, 'videoId is ', video);
    if (req.user.id === comment.userId || req.user.id === video.userId) {
      await Comments.findByIdAndDelete(req.params.id);
      res.status(201).json('Comment is deleted');
    } else {
      res.status(400).json('You can delete only your comment');
    }
  } catch (err) {
    res.send(err);
  }
};
export const getAllComment = async (req, res, next) => {
  try {
    console.log(req.params.videoId);
    const comments = await Comments.find({ videoId: req.params.videoId });
    res.status(200).json(comments);
  } catch (err) {
    res.send(err);
  }
};
