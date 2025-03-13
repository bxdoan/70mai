import React from 'react';
import { Box, Container } from '@chakra-ui/react';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Header />
      <Box flex="1" as="main">
        <Container maxW="container.xl" py={8}>
          {children}
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default MainLayout; 