import { FC } from 'react';
import { Container } from '@mui/material';
import Header from './components/Header';

const MainLayout: FC = ({ children }) => {
  return (
    <>
      <Header />
      <Container sx={{ mt: 2 }}>{children}</Container>
    </>
  );
};

export default MainLayout;
