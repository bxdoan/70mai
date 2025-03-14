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
  Icon,
  Flex,
  Tooltip
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaYoutube, FaPhoneAlt, FaMapMarkerAlt, FaEnvelope, FaGithub } from 'react-icons/fa';
import { 
  FaCcVisa, 
  FaCcMastercard, 
  FaCcPaypal, 
  FaCcAmex, 
  FaCcJcb, 
  FaMoneyBillWave 
} from 'react-icons/fa';
import logo from '../assets/logo.png';

// Import SVG icons as React components
const VNPayIcon = () => (
  <svg width="24" height="24" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
    <rect width="512" height="512" fill="#0E1D42" />
    <path d="M256 73.116L445.217 438.884H66.783L256 73.116Z" fill="#DD0127" />
  </svg>
);

const MoMoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
    <rect width="512" height="512" fill="#ae2070" />
    <path d="M256 120C200 120 155 165 155 221C155 277 200 322 256 322C312 322 357 277 357 221C357 165 312 120 256 120ZM256 282C222 282 195 254 195 221C195 188 222 160 256 160C290 160 317 188 317 221C317 254 290 282 256 282Z" fill="white" />
    <path d="M380 120H340V160H380V120Z" fill="white" />
    <path d="M130 120H170V160H130V120Z" fill="white" />
    <path d="M256 392C177 392 112 352 112 352V392C112 392 177 432 256 432C335 432 400 392 400 392V352C400 352 335 392 256 392Z" fill="white" />
  </svg>
);

const ZaloPayIcon = () => (
  <svg width="24" height="24" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
    <rect width="512" height="512" fill="#0068FF" />
    <path d="M256 159C202.9 159 160 195.5 160 240C160 268.4 178.8 293.1 205.7 306.4C208.7 307.8 213 309.7 214.6 312.7C216.2 315.8 215.8 320.5 215.4 323.6C214.9 327.7 213.1 335 211.6 339.8C210.5 343.5 214 346.8 217.5 345.2L258.3 323.6C262.7 323.8 267.2 324 271.8 324C324.8 324 367.8 287.5 367.8 243C367.8 198.5 324.9 159 256 159Z" fill="white" />
    <path d="M197.5 233.6H183.5C180.4 233.6 177.9 236.1 177.9 239.2V283.2C177.9 286.3 180.4 288.8 183.5 288.8H197.5C200.6 288.8 203.1 286.3 203.1 283.2V239.2C203.1 236.1 200.6 233.6 197.5 233.6Z" fill="#0068FF" />
    <path d="M235.2 233.6H221.2C218.1 233.6 215.6 236.1 215.6 239.2V283.2C215.6 286.3 218.1 288.8 221.2 288.8H235.2C238.3 288.8 240.8 286.3 240.8 283.2V239.2C240.8 236.1 238.3 233.6 235.2 233.6Z" fill="#0068FF" />
    <path d="M292.3 233.6H278.3C275.2 233.6 272.7 236.1 272.7 239.2V258.9L253.6 234.9C252.2 233.1 249.9 232 247.5 232H237.6C234.5 232 232 234.5 232 237.6V281.6C232 284.7 234.5 287.2 237.6 287.2H251.6C254.7 287.2 257.2 284.7 257.2 281.6V262.8L276.5 287.1C277.8 288.8 280.1 289.8 282.4 289.8H292.3C295.4 289.8 297.9 287.3 297.9 284.2V239.2C297.9 236.1 295.5 233.6 292.3 233.6Z" fill="#0068FF" />
    <path d="M350.1 263.4H319.7V239.2C319.7 236.1 317.2 233.6 314.1 233.6H300.1C297 233.6 294.5 236.1 294.5 239.2V283.2C294.5 286.3 297 288.8 300.1 288.8H314.1C317.2 288.8 319.7 286.3 319.7 283.2V277.8H350.1C353.2 277.8 355.7 275.3 355.7 272.2V269C355.7 265.9 353.2 263.4 350.1 263.4Z" fill="#0068FF" />
  </svg>
);

const UnionPayIcon = () => (
  <svg width="24" height="24" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
    <rect width="512" height="512" fill="#FFFFFF" />
    <path d="M157 117H81C72.7 117 66 123.7 66 132V380C66 388.3 72.7 395 81 395H157C165.3 395 172 388.3 172 380V132C172 123.7 165.3 117 157 117Z" fill="#007B84" />
    <path d="M294 117H218C209.7 117 203 123.7 203 132V380C203 388.3 209.7 395 218 395H294C302.3 395 309 388.3 309 380V132C309 123.7 302.3 117 294 117Z" fill="#CF0A2C" />
    <path d="M431 117H355C346.7 117 340 123.7 340 132V380C340 388.3 346.7 395 355 395H431C439.3 395 446 388.3 446 380V132C446 123.7 439.3 117 431 117Z" fill="#00447C" />
  </svg>
);

const ShopeePayIcon = () => (
  <svg width="24" height="24" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
    <rect width="512" height="512" fill="#F53D2D" />
    <path d="M256 109C191.1 109 138.7 161.4 138.7 226.3C138.7 291.2 191.1 343.6 256 343.6C320.9 343.6 373.3 291.2 373.3 226.3C373.3 161.4 320.9 109 256 109ZM256 317.6C205.5 317.6 164.7 276.8 164.7 226.3C164.7 175.8 205.5 135 256 135C306.5 135 347.3 175.8 347.3 226.3C347.3 276.8 306.5 317.6 256 317.6Z" fill="white" />
    <path d="M285.7 226.3C285.7 242.8 272.5 256 256 256C239.5 256 226.3 242.8 226.3 226.3C226.3 209.8 239.5 196.6 256 196.6C272.5 196.6 285.7 209.8 285.7 226.3Z" fill="white" />
    <path d="M256 385.6C199.1 385.6 150.8 349.8 135.1 299.1C132.1 306.6 130.1 314.6 129.4 323C129.2 325.9 129.1 328.9 129.1 331.9C129.1 378.7 167.1 416.7 213.9 416.7H298.1C344.9 416.7 382.9 378.7 382.9 331.9C382.9 328.9 382.8 325.9 382.6 323C381.9 314.6 379.9 306.6 376.9 299.1C361.2 349.8 312.9 385.6 256 385.6Z" fill="white" />
  </svg>
);

const Footer: React.FC = () => {
  return (
    <Box as="footer" bg="gray.900" color="white" pt={10} pb={6}>
      <Container maxW="container.xl">
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8} mb={8}>
          <Stack spacing={4} align="flex-start">
            <Image 
              src={logo}
              alt="70mai Logo"
              h="40px"
              objectFit="contain"
              filter="brightness(0) invert(1)"
              mb={2}
            />
            <Text fontSize="sm">
              70mai Nha Trang là thương hiệu hàng đầu về thiết bị thông minh cho xe hơi,
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
              <Link href="https://github.com/bxdoan" isExternal>
                <Icon as={FaGithub} boxSize={5} />
              </Link>
            </HStack>
          </Stack>

          <Stack spacing={4} align="flex-start">
            <Heading as="h4" size="md" mb={2} color="white">
              Sản phẩm
            </Heading>
            <Link as={RouterLink} to="/category/camera-hanh-trinh">Camera hành trình</Link>
            <Link as={RouterLink} to="/category/phu-kien-70mai">Phụ kiện xe hơi</Link>
            <Link as={RouterLink} to="/category/phu-kien-camera">Phụ kiện camera</Link>
          </Stack>

          <Stack spacing={4} align="flex-start">
            <Heading as="h4" size="md" mb={2} color="white">
              Thông tin
            </Heading>
            <Link as={RouterLink} to="/about">Giới thiệu</Link>
            <Link as={RouterLink} to="/contact">Liên hệ</Link>
          </Stack>

          <Stack spacing={4} align="flex-start">
            <Heading as="h4" size="md" mb={2} color="white">
              Liên hệ
            </Heading>
            <HStack>
              <Icon as={FaMapMarkerAlt} />
              <Text>Địa chỉ: <Link href="https://maps.app.goo.gl/Trt57uWqNHq36yVQ8" isExternal>2/18 Ngô Đến, Nha Trang, Khánh Hòa</Link></Text>
            </HStack>
            <HStack>
              <Icon as={FaPhoneAlt} />
              <Text>Hotline: <Link href="tel:0888884368">08 8888 4368</Link></Text>
            </HStack>
            <HStack>
              <Icon as={FaEnvelope} />
              <Text>Email: <Link href="mailto:hdnhatrang79@gmail.com">hdnhatrang79@gmail.com</Link></Text>
            </HStack>
          </Stack>
        </SimpleGrid>

        {/* Payment Methods Section */}
        <Box borderTopWidth={1} borderTopColor="gray.700" pt={6} pb={4}>
          <Stack spacing={3} align="center">
            <Heading as="h5" size="sm" mb={2} color="white">
              Chấp nhận thanh toán qua
            </Heading>
            <Flex flexWrap="wrap" justifyContent="center" gap={4}>
              {/* International payment methods */}
              <Tooltip label="Visa" hasArrow>
                <Box bg="white" p={2} borderRadius="md">
                  <Icon as={FaCcVisa} boxSize={8} color="blue.600" />
                </Box>
              </Tooltip>
              <Tooltip label="Mastercard" hasArrow>
                <Box bg="white" p={2} borderRadius="md">
                  <Icon as={FaCcMastercard} boxSize={8} color="red.500" />
                </Box>
              </Tooltip>
              <Tooltip label="PayPal" hasArrow>
                <Box bg="white" p={2} borderRadius="md">
                  <Icon as={FaCcPaypal} boxSize={8} color="blue.500" />
                </Box>
              </Tooltip>
              <Tooltip label="American Express" hasArrow>
                <Box bg="white" p={2} borderRadius="md">
                  <Icon as={FaCcAmex} boxSize={8} color="blue.700" />
                </Box>
              </Tooltip>
              <Tooltip label="JCB" hasArrow>
                <Box bg="white" p={2} borderRadius="md">
                  <Icon as={FaCcJcb} boxSize={8} color="green.600" />
                </Box>
              </Tooltip>
              <Tooltip label="UnionPay" hasArrow>
                <Box bg="white" p={2} borderRadius="md">
                  <UnionPayIcon />
                </Box>
              </Tooltip>
              
              {/* Vietnamese payment methods */}
              <Tooltip label="MoMo" hasArrow>
                <Box bg="white" p={2} borderRadius="md">
                  <MoMoIcon />
                </Box>
              </Tooltip>
              <Tooltip label="VNPay" hasArrow>
                <Box bg="white" p={2} borderRadius="md">
                  <VNPayIcon />
                </Box>
              </Tooltip>
              <Tooltip label="ZaloPay" hasArrow>
                <Box bg="white" p={2} borderRadius="md">
                  <ZaloPayIcon />
                </Box>
              </Tooltip>
              <Tooltip label="ShopeePay" hasArrow>
                <Box bg="white" p={2} borderRadius="md">
                  <ShopeePayIcon />
                </Box>
              </Tooltip>
              <Tooltip label="Chuyển khoản ngân hàng" hasArrow>
                <Box bg="white" p={2} borderRadius="md">
                  <Icon as={FaMoneyBillWave} boxSize={8} color="green.500" />
                </Box>
              </Tooltip>
            </Flex>
          </Stack>
        </Box>

        <Box borderTopWidth={1} borderTopColor="gray.700" pt={6}>
          <Text textAlign="center" fontSize="sm">
            © {new Date().getFullYear()} 70mai Nha Trang. Tất cả quyền được bảo lưu.
          </Text>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 