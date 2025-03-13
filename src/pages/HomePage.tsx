import React from 'react';
import { 
  Box, 
  Heading, 
  Text, 
  SimpleGrid, 
  Button, 
  Image, 
  Flex, 
  Container,
  Stack
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import ProductCard from '../components/ProductCard';
import MainLayout from '../layouts/MainLayout';

const HomePage: React.FC = () => {
  const { products, isLoading } = useProducts();
  const { categories } = useCategories();
  
  const featuredProducts = products.slice(0, 4);
  
  return (
    <MainLayout>
      {/* Hero Section */}
      <Box 
        bgImage="url('https://70maivietnam.store/cdn/shop/files/70mai-banner-web.png')"
        bgSize="cover"
        bgPosition="center"
        h="500px"
        borderRadius="lg"
        mb={10}
        position="relative"
      >
        <Box 
          position="absolute" 
          top="0" 
          left="0" 
          w="100%" 
          h="100%" 
          bg="blackAlpha.600"
          borderRadius="lg"
        />
        <Flex 
          direction="column" 
          align="flex-start" 
          justify="center" 
          position="absolute" 
          top="0" 
          left="0" 
          w="100%" 
          h="100%" 
          p={8}
        >
          <Container maxW="container.xl">
            <Stack spacing={4} maxW="lg">
              <Heading as="h1" size="2xl" color="white">
                Thiết bị thông minh cho xe hơi
              </Heading>
              <Text color="white" fontSize="xl">
                Camera hành trình và phụ kiện xe hơi 70mai chính hãng
              </Text>
              <Box>
                <Button 
                  as={Link} 
                  to="/category/camera-hanh-trinh" 
                  size="lg" 
                  colorScheme="blue"
                  mt={4}
                >
                  Khám phá ngay
                </Button>
              </Box>
            </Stack>
          </Container>
        </Flex>
      </Box>

      {/* Categories Section */}
      <Box mb={16}>
        <Heading as="h2" mb={8} textAlign="center">
          Danh mục sản phẩm
        </Heading>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 5 }} spacing={8}>
          {categories.map((category) => (
            <Box 
              key={category.id} 
              as={Link} 
              to={`/category/${category.id}`} 
              borderRadius="lg" 
              overflow="hidden"
              _hover={{ transform: 'translateY(-5px)', boxShadow: 'xl' }}
              transition="all 0.3s"
            >
              <Box position="relative" pb="70%">
                <Image
                  src={category.imageUrl}
                  alt={category.name}
                  position="absolute"
                  top="0"
                  left="0"
                  width="100%"
                  height="100%"
                  objectFit="cover"
                />
                <Box 
                  position="absolute" 
                  bottom="0" 
                  left="0" 
                  width="100%" 
                  bg="blackAlpha.700" 
                  p={3}
                >
                  <Text color="white" fontWeight="bold" textAlign="center">
                    {category.name}
                  </Text>
                </Box>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Box>

      {/* Featured Products Section */}
      <Box mb={16}>
        <Heading as="h2" mb={8} textAlign="center">
          Sản phẩm nổi bật
        </Heading>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={8}>
          {isLoading ? (
            [...Array(4)].map((_, i) => (
              <Box 
                key={i} 
                height="400px" 
                borderRadius="lg" 
                bg="gray.100" 
                opacity={0.7}
                transition="all 0.3s ease-in-out"
              />
            ))
          ) : (
            featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </SimpleGrid>
        <Flex justify="center" mt={8}>
          <Button as={Link} to="/products" size="lg" colorScheme="blue">
            Xem tất cả sản phẩm
          </Button>
        </Flex>
      </Box>

      {/* Features Section */}
      <Box mb={16}>
        <Heading as="h2" mb={8} textAlign="center">
          Tại sao chọn 70mai?
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          <Flex direction="column" align="center" textAlign="center">
            <Image 
              src="https://70maivietnam.store/cdn/shop/files/70mai_A800_4K_Ultra_HD_270.png" 
              alt="Sản phẩm chính hãng"
              h="100px"
              objectFit="contain"
              mb={4}
            />
            <Heading as="h3" size="md" mb={2}>
              Sản phẩm chính hãng
            </Heading>
            <Text>Cam kết 100% hàng chính hãng, đầy đủ tem nhãn và bảo hành</Text>
          </Flex>
          <Flex direction="column" align="center" textAlign="center">
            <Image 
              src="https://70maivietnam.store/cdn/shop/files/70mai_Dash_Cam_M300_2_270.png" 
              alt="Hỗ trợ kỹ thuật 24/7"
              h="100px"
              objectFit="contain"
              mb={4}
            />
            <Heading as="h3" size="md" mb={2}>
              Hỗ trợ kỹ thuật 24/7
            </Heading>
            <Text>Đội ngũ tư vấn và hỗ trợ kỹ thuật luôn sẵn sàng phục vụ 24/7</Text>
          </Flex>
          <Flex direction="column" align="center" textAlign="center">
            <Image 
              src="https://70maivietnam.store/cdn/shop/files/70mai_Dash_Cam_Pro_Plus_A500s_300.png" 
              alt="Giao hàng toàn quốc"
              h="100px"
              objectFit="contain"
              mb={4}
            />
            <Heading as="h3" size="md" mb={2}>
              Giao hàng toàn quốc
            </Heading>
            <Text>Giao hàng nhanh chóng, miễn phí trong nội thành TP. Hồ Chí Minh</Text>
          </Flex>
        </SimpleGrid>
      </Box>
    </MainLayout>
  );
};

export default HomePage; 