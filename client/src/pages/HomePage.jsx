import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from '../components/Card';
import axios from 'axios';

export default function HomePage({ type }) {
  const [videos, setVideos] = useState([]);
  const fetchVideo = async () => {
    const res = await axios.get(`/videos/${type}`);
    console.log(res.data);
    setVideos(res.data);
  };
  useEffect(() => {
    fetchVideo();
  }, [type]);
  const Container = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  `;
  console.log(videos);
  return (
    <Container>
      {videos.map((v) => (
        <Card key={v.id} video={v} />
      ))}
    </Container>
  );
}
