import React from 'react';
import { Box, Container } from '@chakra-ui/react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import CallButton from '../components/CallButton';

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
      <CallButton 
        phoneNumbers={[
          {
            phoneNumber: "0888884368",
            displayNumber: "08.8888.4368",
            label: "Tư vấn mua hàng"
          },
          {
            phoneNumber: "0905281283",
            displayNumber: "0905.281.283",
            label: "Hỗ trợ chung"
          }
        ]}
        zaloLink="https://zalo.me/hdnhatrang"
        zaloLabel="Nhắn tin tư vấn qua Zalo"
      />
    </Box>
  );
};

export default MainLayout; 