import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { format } from 'timeago.js';
const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.text};
`;
const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
`;

const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`;

const Text = styled.span`
  font-size: 14px;
`;
export default function Comment({ comment }) {
  const [commentUser, setCommentUser] = useState([]);
  const fetchDatail = async () => {
    const res = await axios.get(`/users/${comment.userId}`);
    setCommentUser(res.data);
  };
  useEffect(() => {
    fetchDatail();
  }, []);
  return (
    <Container>
      <Avatar src={commentUser.img} />
      <Details>
        <Name>
          {commentUser?.name} <Date>{format(comment.createdAt)}</Date>
        </Name>
        <Text>{comment.desc}</Text>
      </Details>
    </Container>
  );
}
