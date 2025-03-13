import React from 'react';
import { 
  Box, 
  Container, 
  SimpleGrid, 
  Stack, 
  Text, 
  Heading, 
  Link, 
  Image, 
  HStack, 
  Icon 
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaYoutube, FaPhoneAlt, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <Box as="footer" bg="gray.900" color="white" pt={10} pb={6}>
      <Container maxW="container.xl">
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8} mb={8}>
          <Stack spacing={4} align="flex-start">
            <Image 
              src="https://70maivietnam.store/cdn/shop/files/70mai-logo.png"
              alt="70mai Logo"
              h="40px"
              objectFit="contain"
              filter="brightness(0) invert(1)"
              mb={2}
            />
            <Text fontSize="sm">
              70mai là thương hiệu hàng đầu về thiết bị thông minh cho xe hơi,
              cung cấp các sản phẩm camera hành trình và phụ kiện chất lượng cao.
            </Text>
            <HStack spacing={4} mt={2}>
              <Link href="https://facebook.com" isExternal>
                <Icon as={FaFacebook} boxSize={5} />
              </Link>
              <Link href="https://instagram.com" isExternal>
                <Icon as={FaInstagram} boxSize={5} />
              </Link>
              <Link href="https://youtube.com" isExternal>
                <Icon as={FaYoutube} boxSize={5} />
              </Link>
            </HStack>
          </Stack>

          <Stack spacing={4} align="flex-start">
            <Heading as="h4" size="md" mb={2}>
              Sản phẩm
            </Heading>
            <Link as={RouterLink} to="/category/camera-hanh-trinh">Camera hành trình</Link>
            <Link as={RouterLink} to="/category/phu-kien-xe-hoi">Phụ kiện xe hơi</Link>
            <Link as={RouterLink} to="/category/phu-kien-camera">Phụ kiện camera</Link>
            <Link as={RouterLink} to="/category/camera-an-ninh">Camera an ninh</Link>
            <Link as={RouterLink} to="/category/may-hut-bui">Máy hút bụi</Link>
          </Stack>

          <Stack spacing={4} align="flex-start">
            <Heading as="h4" size="md" mb={2}>
              Thông tin
            </Heading>
            <Link as={RouterLink} to="/about">Giới thiệu</Link>
            <Link as={RouterLink} to="/blog">Blog</Link>
            <Link as={RouterLink} to="/terms">Điều khoản sử dụng</Link>
            <Link as={RouterLink} to="/privacy">Chính sách bảo mật</Link>
            <Link as={RouterLink} to="/shipping">Chính sách vận chuyển</Link>
          </Stack>

          <Stack spacing={4} align="flex-start">
            <Heading as="h4" size="md" mb={2}>
              Liên hệ
            </Heading>
            <HStack>
              <Icon as={FaMapMarkerAlt} />
              <Text>Số 123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh</Text>
            </HStack>
            <HStack>
              <Icon as={FaPhoneAlt} />
              <Text>Hotline: 1900 1234</Text>
            </HStack>
            <HStack>
              <Icon as={FaEnvelope} />
              <Text>Email: info@70maivietnam.store</Text>
            </HStack>
          </Stack>
        </SimpleGrid>

        <Box borderTopWidth={1} borderTopColor="gray.700" pt={6}>
          <Text textAlign="center" fontSize="sm">
            © {new Date().getFullYear()} 70mai Vietnam. Tất cả quyền được bảo lưu.
          </Text>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 