import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from './Card';
const Container = styled.div`
  flex: 2;
`;
export default function Recomendation({ tags }) {
  const [videos, setVideos] = useState([]);

  const fetchVideos = async () => {
    const res = await axios.get(`/videos/tags?tags=${tags}`);
    setVideos(res.data);
  };
  useEffect(() => {
    fetchVideos();
  }, [tags]);
  return (
    <Container>
      {videos?.map((vid) => {
        return <Card type={'sm'} video={vid} />;
      })}
    </Container>
  );
}
