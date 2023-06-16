import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { format } from 'timeago.js';

export default function Card({ type, video }) {
  const [user, setUser] = useState({});
  console.log(video);
  const fetchUser = async () => {
    const res = await axios.get(`/users/${video.userId}`);
    console.log(res.data);
    return res.data;
  };
  useEffect(() => {
    const res = fetchUser();
    setUser(res);
  }, [video.userId]);
  const Container = styled.div`
    width: ${(props) => props.type !== 'sm' && '360px'};
    cursor: pointer;
    margin-bottom: ${(props) => (props.type === 'sm' ? '10px' : '45px')};
    gap: 12px;
    display: ${(props) => props.type === 'sm' && 'flex'};
  `;
  const Image = styled.img`
    width: 100%;
    height: ${(props) => (props.type === 'sm' ? '120px' : '202px')};
    background-color: #999;
    flex: 1;

    border-radius: 15px;
  `;
  const Details = styled.div`
    display: flex;
    margin-top: ${(props) => props.type !== 'sm' && '16px'};
    gap: 12px;
    flex: 1;
  `;

  const ChannelImage = styled.img`
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: #999;
    display: ${(props) => props.type === 'sm' && 'none'};
  `;

  const Texts = styled.div``;

  const Title = styled.h1`
    font-size: 16px;
    font-weight: 500;
    color: ${({ theme }) => theme.text};
  `;

  const ChannelName = styled.h2`
    font-size: 14px;
    color: ${({ theme }) => theme.textSoft};
    margin: 9px 0px;
  `;

  const Info = styled.div`
    font-size: 14px;
    color: ${({ theme }) => theme.textSoft};
  `;
  return (
    <Link to={`/video/${video._id}`} style={{ textDecoration: 'none' }}>
      <Container type={type}>
        <Image type={type} src={video.imgUrl} />
        <Details type={type}>
          <ChannelImage type={type} src={user.img} />
          <Texts>
            <Title>{video.title}</Title>
            <ChannelName>{user.name}</ChannelName>
            <Info>
              {video.views} views • {format(video.createdAt)}
            </Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
}
