import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from '../components/Card';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;
export default function SearchPage() {
  const query = useLocation().search;
  const [videos, setVideos] = useState([]);
  const fetchVideos = async () => {
    const res = await axios.get(`/videos/search${query}`);
    console.log(query);
    console.log(res.data);
    setVideos(res.data);
  };
  useEffect(() => {
    fetchVideos();
  }, [query]);
  return (
    <Container>
      <Container>
        {videos?.map((v) => (
          <Card key={v.id} video={v} />
        ))}
      </Container>
    </Container>
  );
}
