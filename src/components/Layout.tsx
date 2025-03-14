import React, { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      {/* Header sẽ được thêm vào sau */}
      <Box as="main" flex="1">
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout; 