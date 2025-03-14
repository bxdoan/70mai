import React from 'react';
import { 
  Box, 
  Container, 
  Flex, 
  Heading, 
  Text, 
  VStack, 
  HStack, 
  Icon, 
  Link, 
  Input, 
  Textarea, 
  Button, 
  FormControl, 
  FormLabel,
  useColorModeValue,
  SimpleGrid,
  Divider,
  Image
} from '@chakra-ui/react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaFacebook, FaInstagram, FaYoutube, FaGithub } from 'react-icons/fa';
import MainLayout from '../layouts/MainLayout';

const ContactPage: React.FC = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d458.48380976669773!2d109.1958535366535!3d12.26732540245049!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3170678cc4569d75%3A0x6ed33e525d8da564!2sHD%20Nha%20Trang!5e1!3m2!1svi!2s!4v1741926655368!5m2!1svi!2s"
  const storeImages = [
    "https://70maivietnam.store/wp-content/themes/yootheme/cache/95/Viet-Nam-EXPO-95f6b205.webp",
    "https://autochaua.com/wp-content/uploads/2023/12/1.png",
    "https://70maivietnam.store/wp-content/uploads/2024/07/6-2-1024x683.jpg",
    "https://shop70mai.vn/wp-content/uploads/2023/11/MN_7800-1-1200x800.jpg"
  ]
  return (
    <MainLayout
      title="Liên Hệ | 70mai Nha Trang"
      description="Liên hệ với 70mai Nha Trang - Chuyên cung cấp camera hành trình và phụ kiện xe hơi chất lượng cao"
      image="https://70maivietnam.store/wp-content/themes/yootheme/cache/57/70mai-logo-575ce63c.webp"
      url="https://70mai.vercel.app/contact"
    >
      <Box bg={bgColor} py={12}>
        <Container maxW="container.xl">
          <VStack spacing={8} align="stretch">
            {/* Hero Section */}
            <Box textAlign="center" mb={8}>
              <Heading as="h1" size="2xl" mb={4}>Liên Hệ Với Chúng Tôi</Heading>
              <Text fontSize="lg" maxW="2xl" mx="auto">
                Chúng tôi luôn sẵn sàng hỗ trợ bạn với mọi thắc mắc và yêu cầu. 
                Hãy liên hệ với 70mai Nha Trang qua các kênh dưới đây.
              </Text>
            </Box>

            {/* Contact Information and Map */}
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} mb={10}>
              {/* Contact Information */}
              <Box 
                bg={cardBg} 
                p={8} 
                rounded="lg" 
                shadow="md" 
                borderWidth="1px"
                height="100%"
              >
                <VStack spacing={6} align="stretch">
                  <Heading as="h2" size="lg" mb={2}>
                    Thông Tin Liên Hệ
                  </Heading>
                  
                  <VStack spacing={4} align="start">
                    <HStack align="flex-start">
                      <Icon as={FaMapMarkerAlt} mt={1} color="red.500" boxSize={5} />
                      <VStack align="start" spacing={0}>
                        <Text fontWeight="bold">Địa chỉ</Text>
                        <Link href="https://maps.app.goo.gl/Trt57uWqNHq36yVQ8" isExternal color="blue.500">
                          2/18 Ngô Đến, Nha Trang, Khánh Hòa
                        </Link>
                      </VStack>
                    </HStack>

                    <HStack align="flex-start">
                      <Icon as={FaPhoneAlt} mt={1} color="green.500" boxSize={5} />
                      <VStack align="start" spacing={0}>
                        <Text fontWeight="bold">Số điện thoại</Text>
                        <Link href="tel:0888884368" color="blue.500">08 8888 4368</Link>
                      </VStack>
                    </HStack>

                    <HStack align="flex-start">
                      <Icon as={FaEnvelope} mt={1} color="blue.500" boxSize={5} />
                      <VStack align="start" spacing={0}>
                        <Text fontWeight="bold">Email</Text>
                        <Link href="mailto:hdnhatrang79@gmail.com" color="blue.500">
                          hdnhatrang79@gmail.com
                        </Link>
                      </VStack>
                    </HStack>

                    <HStack align="flex-start">
                      <Icon as={FaClock} mt={1} color="orange.500" boxSize={5} />
                      <VStack align="start" spacing={0}>
                        <Text fontWeight="bold">Giờ làm việc</Text>
                        <Text>Thứ 2 - Thứ 7: 8:00 - 18:00</Text>
                        <Text>Chủ nhật: 8:00 - 12:00</Text>
                      </VStack>
                    </HStack>
                  </VStack>

                  <Divider my={4} />

                  <VStack align="start" spacing={2}>
                    <Text fontWeight="bold">Kết nối với chúng tôi</Text>
                    <HStack spacing={4}>
                      <Link href="https://facebook.com" isExternal>
                        <Icon as={FaFacebook} color="facebook.500" boxSize={6} />
                      </Link>
                      <Link href="https://instagram.com" isExternal>
                        <Icon as={FaInstagram} color="pink.500" boxSize={6} />
                      </Link>
                      <Link href="https://youtube.com" isExternal>
                        <Icon as={FaYoutube} color="red.500" boxSize={6} />
                      </Link>
                      <Link href="https://github.com/bxdoan" isExternal>
                        <Icon as={FaGithub} boxSize={6} />
                      </Link>
                    </HStack>
                  </VStack>
                </VStack>
              </Box>

              {/* Google Maps */}
              <Box 
                bg={cardBg} 
                rounded="lg" 
                shadow="md" 
                borderWidth="1px" 
                overflow="hidden"
                height={{ base: "300px", md: "100%" }}
                minH="400px"
              >
                <iframe 
                  src={mapUrl}
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="70mai Nha Trang location"
                />
              </Box>
            </SimpleGrid>

            {/* Contact Form */}
            <Box 
              bg={cardBg} 
              p={8} 
              rounded="lg" 
              shadow="md" 
              borderWidth="1px"
              mb={8}
            >
              <VStack spacing={6}>
                <Heading as="h2" size="lg" textAlign="center">
                  Gửi Tin Nhắn Cho Chúng Tôi
                </Heading>
                <Text textAlign="center" maxW="2xl">
                  Hãy điền thông tin vào form dưới đây, chúng tôi sẽ liên hệ lại với bạn
                  trong thời gian sớm nhất.
                </Text>
                
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w="100%">
                  <FormControl isRequired>
                    <FormLabel>Họ và tên</FormLabel>
                    <Input placeholder="Nhập họ và tên của bạn" />
                  </FormControl>
                  
                  <FormControl isRequired>
                    <FormLabel>Số điện thoại</FormLabel>
                    <Input placeholder="Nhập số điện thoại của bạn" type="tel" />
                  </FormControl>
                </SimpleGrid>
                
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input placeholder="Nhập địa chỉ email của bạn" type="email" />
                </FormControl>
                
                <FormControl isRequired>
                  <FormLabel>Tiêu đề</FormLabel>
                  <Input placeholder="Nhập tiêu đề tin nhắn" />
                </FormControl>
                
                <FormControl isRequired>
                  <FormLabel>Nội dung</FormLabel>
                  <Textarea placeholder="Nhập nội dung tin nhắn của bạn..." minH="150px" />
                </FormControl>
                
                <Button 
                  colorScheme="blue" 
                  size="lg" 
                  width="full" 
                  mt={4}
                  _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
                  transition="all 0.3s"
                >
                  Gửi Tin Nhắn
                </Button>
              </VStack>
            </Box>

            {/* Store Images or Additional Information */}
            <Box>
              <Heading as="h2" size="lg" textAlign="center" mb={8}>
                Hình Ảnh Cửa Hàng
              </Heading>
              <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={6}>
                {storeImages.map((item) => (
                  <Box 
                    key={item}
                    height="200px"
                    bg="gray.300"
                    rounded="md"
                    overflow="hidden"
                  >
                    {/* Placeholder for store images */}
                    <Flex 
                      height="100%" 
                      justify="center" 
                      align="center"
                      color="gray.600"
                    >
                      <Image 
                        src={item} 
                        alt="70mai Nha Trang" 
                        width="100%" 
                        height="100%" 
                        objectFit="cover"
                      />
                    </Flex>
                  </Box>
                ))}
              </SimpleGrid>
            </Box>
          </VStack>
        </Container>
      </Box>
    </MainLayout>
  );
};

export default ContactPage; 