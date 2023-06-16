import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Menu from './components/Menu';
import Navbar from './components/Navbar';
import { darkTheme, lightTheme } from './utils/theme';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import VideoPage from './pages/VideoPage';
import NotfoundPage from './pages/NotfoundPage';
import Signin from './pages/Signin';
import SearchPage from './pages/SearchPage';

export default function App() {
  const [themePreference, setThemePreference] = useState(true);
  const handleTheme = () => setThemePreference((a) => !a);
  const Main = styled.div`
    flex: 7;
    background-color: ${({ theme }) => theme.bg};
  `;
  const Container = styled.div`
    display: flex;
  `;
  const Wrapper = styled.div`
    padding: 22px 96px;
  `;

  return (
    <ThemeProvider theme={themePreference ? lightTheme : darkTheme}>
      <Container>
        <BrowserRouter>
          <Menu handleTheme={handleTheme} theme={themePreference} />
          <Main>
            <Navbar />
            <Wrapper>
              <Routes>
                <Route path="/">
                  <Route index element={<HomePage type={'random'} />} />
                  <Route path="trends" element={<HomePage type={'trends'} />} />
                  <Route
                    path="subscribed"
                    element={<HomePage type={'subscribed'} />}
                  />
                  <Route path="/video/:id" element={<VideoPage />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/signin" element={<Signin />} />
                  <Route path="*" element={<NotfoundPage />} />
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}
