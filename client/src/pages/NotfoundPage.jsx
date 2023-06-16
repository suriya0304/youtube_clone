import React from 'react';
import styled from 'styled-components';
import monkey from '../assets/monkey.png';

export default function NotfoundPage() {
  const Container = styled.div`
    margin: auto;
    margin-top: 200px;
    width: 40%;
    text-align: center;
  `;
  const Text = styled.div`
    text-align: center;
    font-size: 20px;
    color: ${({ theme }) => theme.textSoft};
  `;
  const Image = styled.img`
    height: 250px;
    margin-bottom: 20px;
  `;
  return (
    <Container>
      <Image src={monkey} />
      <Text>
        This page isn't available. Sorry about that. Try searching for something
        else.
      </Text>
    </Container>
  );
}
