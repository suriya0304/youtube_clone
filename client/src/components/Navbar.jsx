import React, { useState } from 'react';
import styled from 'styled-components';
import Button from './Button.styled';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import Upload from './Upload';
import { logout } from '../redux';
import axios from 'axios';
const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 20px;
  justify-content: flex-end;
  position: relative;
`;
const Search = styled.div`
  width: 40%;
  position: absolute;
  left: 0px;
  right: 0px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};
`;
const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    dispatch(logout());
    await axios.get('/auth/logout');
  };
  console.log('current user is ', currentUser);
  return (
    <>
      <Container>
        <Wrapper>
          <Search>
            <Input
              placeholder="  Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  navigate(`/search?search=${search}`);
                  setSearch('');
                }
              }}
            />
            <SearchOutlinedIcon
              onClick={() => {
                setSearch('');
                navigate(`/search?search=${search}`);
              }}
            />
          </Search>

          {currentUser ? (
            <>
              <User>
                <VideoCallOutlinedIcon onClick={() => setOpen(true)} />
                <Avatar src={currentUser.img} />
                {currentUser.name}
              </User>
              <Button onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <Link
              to="/signin"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Button>
                <AccountCircleOutlinedIcon />
                SIGN IN
              </Button>
            </Link>
          )}
        </Wrapper>
      </Container>
      {open && <Upload setOpen={setOpen} />}
    </>
  );
}
