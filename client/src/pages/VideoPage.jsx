import React, { useEffect, useState } from 'react';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import styled from 'styled-components';
import Comments from '../components/Comments';
import Comment from '../components/Comment';
import Card from '../components/Card';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {
  dislike,
  fetchError,
  fetchStart,
  fetchSuccess,
  like,
  subsciption,
} from '../redux';
import { format } from 'timeago.js';
import Recomendation from '../components/Recomendation';
const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
`;
const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;
const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`;
export default function VideoPage() {
  const path = useLocation().pathname.split('/')[2];
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(fetchStart);
        const fetchVideo = await axios.get(`/videos/find/${path}`);
        const fetchUser = await axios.get(`/users/${fetchVideo.data.userId}`);
        await axios.put(`/videos/views/${path}`);
        setChannel(fetchUser.data);
        dispatch(fetchSuccess(fetchVideo.data));
      } catch (err) {
        dispatch(fetchError());
        console.log(err);
      }
    };
    fetchData();
  }, [path, dispatch]);

  const handleLike = async () => {
    await axios.put(`/users/like/${currentVideo._id}`);
    dispatch(like(currentUser._id));
  };
  const handleDislike = async () => {
    await axios.put(`/users/dislike/${currentVideo._id}`);
    dispatch(dislike(currentUser._id));
  };

  const isSubscribed = currentUser?.subscribedUsers.includes(channel?._id);
  const handleSubscribe = async () => {
    if (isSubscribed) {
      await axios.put(`/users/unsub/${channel._id}`);
    } else {
      await axios.put(`/users/sub/${channel._id}`);
    }

    dispatch(subsciption(channel._id));
  };
  return (
    <div>
      <Container>
        <Content>
          <VideoWrapper>
            <VideoFrame src={currentVideo?.vidUrl} controls />
          </VideoWrapper>
          <Title>{currentVideo?.title}</Title>
          <Details>
            <Info>
              {currentVideo?.views} views • {format(currentVideo?.createdAt)}
            </Info>
            <Buttons>
              <Button onClick={handleLike}>
                {currentVideo?.likes.includes(currentUser?._id) ? (
                  <ThumbUpIcon />
                ) : (
                  <ThumbUpOutlinedIcon />
                )}{' '}
                {currentVideo?.likes.length}
              </Button>
              <Button onClick={handleDislike}>
                {currentVideo?.dislikes.includes(currentUser?._id) ? (
                  <ThumbDownIcon />
                ) : (
                  <ThumbDownOffAltOutlinedIcon />
                )}{' '}
                {currentVideo?.dislikes.length}
              </Button>
              <Button>
                <ReplyOutlinedIcon /> Share
              </Button>
              <Button>
                <AddTaskOutlinedIcon /> Save
              </Button>
            </Buttons>
          </Details>
          <Hr />
          <Channel>
            <ChannelInfo>
              <Image src={channel.img} />
              <ChannelDetail>
                <ChannelName>{channel.name}</ChannelName>
                <ChannelCounter>
                  {channel.subscribers} Subscribers
                </ChannelCounter>
                <Description>{currentVideo?.desc}</Description>
              </ChannelDetail>
            </ChannelInfo>
            <Subscribe onClick={handleSubscribe}>
              {isSubscribed ? 'SUBSCRIBED' : 'SUBSCRIBE'}
            </Subscribe>
          </Channel>
          <Hr />
          <Comments videoId={path} />
        </Content>
        <Recomendation tags={currentVideo?.tags}></Recomendation>
      </Container>
    </div>
  );
}
