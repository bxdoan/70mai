import React from 'react';
import { Box, Container } from '@chakra-ui/react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  title,
  description,
  image,
  url
}) => {
  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <SEO 
        title={title}
        description={description}
        image={image}
        url={url}
      />
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