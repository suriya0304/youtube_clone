import Video from '../models/Video.js';
import User from '../models/Users.js';
export const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    res.status(200).json(video);
  } catch (err) {
    res.send(err);
  }
};
export const addVideo = async (req, res, next) => {
  const newVideo = new Video({ userId: req.user.id, ...req.body });
  try {
    const saveVid = await newVideo.save();
    res.status(200).json(saveVid);
  } catch (err) {
    res.send(err);
  }
};
export const updateVideo = async (req, res, next) => {
  const video = await Video.findById(req.params.id);
  if (!video) {
    res.send('video not found');
  }
  if (req.user.id === video.id) {
    try {
      const updatedVid = await Video.findByIdAndUpdate(
        req.param.id,
        {
          $set: req.body,
        },
        { new: true }
      );

      res.status(201).json(updatedVid);
    } catch (err) {}
  } else {
    res.send('you can only update your video');
  }
};
export const deleteVideo = async (req, res, next) => {
  const video = await Video.findById(req.params.id);
  if (!video) {
    res.send('video not found');
  }
  if (req.user.id === video.id) {
    try {
      await Video.findByIdAndDelete(req.param.id);

      res.status(201).json('deleted video');
    } catch (err) {}
  } else {
    res.send('you can only delete your video');
  }
};

export const addView = async (req, res, next) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });
    res.send('views of the video is increased');
  } catch {
    res.send(err);
  }
};

export const randomVideo = async (req, res, next) => {
  try {
    const random = await Video.aggregate([{ $sample: { size: 40 } }]);
    res.status(200).json(random);
  } catch (err) {
    res.send(err);
  }
};
export const trendingVideo = async (req, res, next) => {
  try {
    const trend = await Video.find().sort({ views: -1 });
    res.status(200).json(trend);
  } catch (err) {
    res.send(err);
  }
};
export const subscribedVideo = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const subscribedChannel = user.subscribedUsers;
  console.log(subscribedChannel);
  const list = await Promise.all(
    subscribedChannel.map((channelId) => {
      return Video.find({ userId: channelId });
    })
  );
  console.log(list);
  res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
};

export const getByTags = async (req, res, next) => {
  const tags = req.query.tags.split(',');
  console.log(tags);
  try {
    const videos = await Video.find({ tags: { $in: tags } }).limit(20);
    res.status(200).send(videos);
  } catch (err) {
    res.send(err);
  }
};

export const getBySearch = async (req, res, next) => {
  const query = req.query.search;
  try {
    const videos = await Video.find({
      title: { $regex: query, $options: 'i' },
    });
    res.status(200).send(videos);
  } catch (err) {
    res.send(err);
  }
};

export const like = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.id;
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { likes: id },
      $pull: { dislikes: id },
    });
    res.status(200).json('Video is liked');
  } catch (err) {
    req.send(err);
  }
};
export const dislike = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.id;
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { dislikes: id },
      $pull: { likes: id },
    });
    res.status(200).json('Video is disliked');
  } catch (err) {
    req.send(err);
  }
};
