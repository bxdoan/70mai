import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Image, 
  Flex, 
  Heading, 
  Text, 
  Button, 
  Divider, 
  HStack, 
  List, 
  ListItem, 
  ListIcon, 
  NumberInput, 
  NumberInputField, 
  NumberInputStepper, 
  NumberIncrementStepper, 
  NumberDecrementStepper,
  SimpleGrid,
  Badge,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Table,
  Tbody,
  Tr,
  Td
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { FaCheck } from 'react-icons/fa';
import { useProduct } from '../hooks/useProducts';
import { useProducts } from '../hooks/useProducts';
import MainLayout from '../layouts/MainLayout';
import ProductCard from '../components/ProductCard';

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price);
};

const ProductDetailPage: React.FC = () => {
  const { id } = useParams();
  const { product, isLoading } = useProduct(id || '');
  const { products } = useProducts();
  const [quantity, setQuantity] = useState(1);

  // Get related products (same category)
  const relatedProducts = products
    .filter(p => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4);

  if (isLoading) {
    return (
      <MainLayout>
        <Container maxW="container.xl" py={8}>
          <Box p={8} textAlign="center">
            <Text>Đang tải thông tin sản phẩm...</Text>
          </Box>
        </Container>
      </MainLayout>
    );
  }

  if (!product) {
    return (
      <MainLayout>
        <Container maxW="container.xl" py={8}>
          <Box p={8} textAlign="center">
            <Heading>Không tìm thấy sản phẩm</Heading>
            <Text mt={4}>Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</Text>
          </Box>
        </Container>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Container maxW="container.xl" py={8}>
        <Flex direction={{ base: 'column', md: 'row' }} gap={8}>
          {/* Product Image */}
          <Box flex="1" position="relative">
            <Box
              border="1px"
              borderColor="gray.200"
              borderRadius="md"
              p={4}
              bg="white"
            >
              <Image 
                src={product.imageUrl} 
                alt={product.name} 
                w="100%" 
                h="400px"
                objectFit="contain"
              />
              {product.discount > 0 && (
                <Badge 
                  colorScheme="red" 
                  position="absolute" 
                  top="10px" 
                  right="10px" 
                  fontSize="md"
                  borderRadius="md"
                  px={2}
                  py={1}
                >
                  -{product.discount}%
                </Badge>
              )}
            </Box>
          </Box>

          {/* Product Info */}
          <Box flex="1">
            <Heading as="h1" size="xl" mb={4}>
              {product.name}
            </Heading>

            <HStack mb={4}>
              <Text fontWeight="bold" fontSize="2xl" color="brand.500">
                {formatPrice(product.price)}
              </Text>
              {product.discount > 0 && (
                <Text fontSize="lg" textDecoration="line-through" color="gray.500">
                  {formatPrice(product.originalPrice)}
                </Text>
              )}
            </HStack>

            <Text mb={6}>
              {product.description}
            </Text>

            {/* Features List */}
            <Box mb={6}>
              <Text fontWeight="bold" mb={2}>Tính năng nổi bật:</Text>
              <List spacing={2}>
                {product.features.map((feature, index) => (
                  <ListItem key={index} display="flex" alignItems="center">
                    <ListIcon as={FaCheck} color="green.500" />
                    {feature}
                  </ListItem>
                ))}
              </List>
            </Box>

            {/* Stock Status */}
            <Box mb={6}>
              <Text fontWeight="bold" color={product.stock > 0 ? 'green.500' : 'red.500'}>
                {product.stock > 0 ? `Còn hàng (${product.stock})` : 'Hết hàng'}
              </Text>
            </Box>

            {/* Quantity Selector */}
            <Flex mb={6} align="center">
              <Text mr={4}>Số lượng:</Text>
              <NumberInput 
                defaultValue={1} 
                min={1} 
                max={product.stock} 
                w="100px"
                value={quantity}
                onChange={(_, value) => setQuantity(value)}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Flex>

            {/* Add to Cart Button */}
            <Button 
              colorScheme="blue" 
              size="lg" 
              leftIcon={<FiShoppingCart />} 
              w="100%"
              isDisabled={product.stock === 0}
            >
              Thêm vào giỏ hàng
            </Button>
          </Box>
        </Flex>

        <Divider my={10} />

        {/* Product Details Tab */}
        <Tabs mt={10} colorScheme="blue">
          <TabList>
            <Tab>Mô tả chi tiết</Tab>
            <Tab>Thông số kỹ thuật</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Text whiteSpace="pre-line">
                {product.description}
                
                {/* Expand the description for the detailed tab */}
                {"\n\n"}
                {product.name} là một trong những sản phẩm nổi bật của thương hiệu 70mai, 
                cung cấp giải pháp ghi hình chất lượng cao khi di chuyển. 
                Với thiết kế nhỏ gọn và tính năng thông minh, 
                sản phẩm này là lựa chọn lý tưởng cho các chủ xe muốn đảm bảo an toàn 
                và ghi lại hành trình của mình.
                
                {"\n\n"}
                <strong>Tính năng nổi bật:</strong>
                {"\n"}
                {product.features.join("\n")}
              </Text>
            </TabPanel>
            <TabPanel>
              <Table variant="simple">
                <Tbody>
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <Tr key={key}>
                      <Td fontWeight="bold" w="30%">{key.charAt(0).toUpperCase() + key.slice(1)}</Td>
                      <Td>{value}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TabPanel>
          </TabPanels>
        </Tabs>

        {/* Related Products */}
        <Box mt={16}>
          <Heading as="h2" size="lg" mb={6}>
            Sản phẩm liên quan
          </Heading>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={8}>
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </SimpleGrid>
        </Box>
      </Container>
    </MainLayout>
  );
};

export default ProductDetailPage; 