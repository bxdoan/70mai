import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Flex, 
  Text, 
  Icon, 
  usePrefersReducedMotion,
  Button,
  useDisclosure,
  Collapse,
  VStack,
  Divider
} from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { FaPhone, FaPhoneAlt, FaCommentDots } from 'react-icons/fa';
import './CallButton.css';

// Define animation keyframes
const pulse = keyframes`
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(0, 123, 255, 0.7); }
  70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(0, 123, 255, 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(0, 123, 255, 0); }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-5px); }
  60% { transform: translateY(-3px); }
`;

interface PhoneNumber {
  phoneNumber: string;
  displayNumber: string;
  label?: string;
}

interface CallButtonProps {
  phoneNumbers: PhoneNumber[];
  zaloLink?: string;
  zaloLabel?: string;
}

const CallButton: React.FC<CallButtonProps> = ({ 
  phoneNumbers = [{
    phoneNumber: "0973456789", 
    displayNumber: "0973.456.789",
    label: "Hỗ trợ chung"
  }],
  zaloLink = "",
  zaloLabel = "Chat với chúng tôi qua Zalo"
}) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { isOpen, onToggle } = useDisclosure();
  const [showBounce, setShowBounce] = useState(true);
  
  // Animation for the pulse effect
  const pulseAnimation = prefersReducedMotion
    ? undefined
    : `${pulse} 2s infinite`;
  
  // Animation for the bounce effect
  const bounceAnimation = prefersReducedMotion || !showBounce
    ? undefined
    : `${bounce} 2s infinite`;

  // Periodically show bounce animation to attract attention
  useEffect(() => {
    const bounceInterval = setInterval(() => {
      setShowBounce(true);
      const timeout = setTimeout(() => {
        setShowBounce(false);
      }, 6000);
      
      return () => clearTimeout(timeout);
    }, 15000);
    
    return () => clearInterval(bounceInterval);
  }, []);

  return (
    <Box
      position="fixed"
      bottom="4px"
      right="20px"
      zIndex={999}
      className="call-button-container"
    >
      <Flex direction="column" alignItems="flex-end">
        <Collapse in={isOpen} animateOpacity>
          <Flex
            bg="white"
            borderRadius="md"
            boxShadow="lg"
            p={3}
            mb={2}
            alignItems="flex-start"
            justifyContent="space-between"
            className="call-popup"
            direction="column"
            minWidth="260px"
          >
            <Text fontWeight="bold" fontSize="sm" mb={2} pb={2} borderBottom="1px solid" borderColor="gray.100" width="100%" textAlign="center">
              Hotline hỗ trợ
            </Text>
            <VStack spacing={3} align="stretch" width="100%">
              {phoneNumbers.map((item, index) => (
                <React.Fragment key={item.phoneNumber}>
                  {index > 0 && <Divider my={1} />}
                  <Flex 
                    justifyContent="space-between" 
                    alignItems="center" 
                    className="phone-item"
                    p={2}
                    borderRadius="md"
                  >
                    <Box>
                      <Text fontWeight="bold">
                        {item.displayNumber}
                      </Text>
                      {item.label && (
                        <Text fontSize="xs" color="gray.600">{item.label}</Text>
                      )}
                    </Box>
                    <Button
                      as="a"
                      href={`tel:${item.phoneNumber}`}
                      colorScheme="green"
                      size="sm"
                      leftIcon={<Icon as={FaPhoneAlt} />}
                    >
                      Gọi ngay
                    </Button>
                  </Flex>
                </React.Fragment>
              ))}
              
              {zaloLink && (
                <>
                  <Divider my={2} />
                  <Flex 
                    justifyContent="space-between" 
                    alignItems="center" 
                    className="phone-item zalo-item"
                    p={3}
                    borderRadius="md"
                  >
                    <Box>
                      <Text fontWeight="bold" color="#0068ff" display="flex" alignItems="center">
                        <Box as="span" mr={1} fontSize="lg" fontWeight="bold">Zalo</Box>
                      </Text>
                      {zaloLabel && (
                        <Text fontSize="xs" color="gray.600">{zaloLabel}</Text>
                      )}
                    </Box>
                    <Button
                      as="a"
                      href={zaloLink}
                      colorScheme="blue"
                      size="sm"
                      leftIcon={<Icon as={FaCommentDots} />}
                      target="_blank"
                      rel="noopener noreferrer"
                      _hover={{ transform: "translateY(-2px)" }}
                      transition="all 0.2s"
                      className="zalo-button"
                    >
                      Chat Zalo
                    </Button>
                  </Flex>
                </>
              )}
            </VStack>
          </Flex>
        </Collapse>
        
        <Flex
          onClick={onToggle}
          alignItems="center"
          justifyContent="center"
          bg="blue.500"
          color="white"
          borderRadius="full"
          w="60px"
          h="60px"
          cursor="pointer"
          animation={isOpen ? undefined : pulseAnimation}
          transition="all 0.3s"
          _hover={{ bg: "blue.600", transform: "scale(1.05)" }}
          boxShadow="lg"
          position="relative"
          className="call-button"
        >
          <Box
            position="absolute"
            top="-5px"
            right="-5px"
            bg="red.500"
            color="white"
            borderRadius="full"
            w="22px"
            h="22px"
            fontSize="xs"
            display="flex"
            alignItems="center"
            justifyContent="center"
            animation={bounceAnimation}
            className="badge-counter"
          >
            {phoneNumbers.length + (zaloLink ? 1 : 0)}
          </Box>
          <Icon as={FaPhone} fontSize="24px" />
        </Flex>
      </Flex>
    </Box>
  );
};

export default CallButton; 