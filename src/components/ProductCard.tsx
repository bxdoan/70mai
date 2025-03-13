import React from 'react';
import { 
  Box, 
  Image, 
  Text, 
  Stack, 
  Badge, 
  Flex,
  Button
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price);
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Box 
      borderWidth="1px" 
      borderRadius="lg" 
      overflow="hidden" 
      _hover={{ 
        transform: 'translateY(-5px)', 
        boxShadow: 'xl',
        borderColor: 'brand.500'
      }} 
      transition="all 0.3s"
      h="100%"
      display="flex"
      flexDirection="column"
    >
      <Link to={`/product/${product.id}`}>
        <Box position="relative" pb="100%" bg="gray.100">
          <Image
            src={product.imageUrl}
            alt={product.name}
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            objectFit="contain"
            p={4}
          />
          {product.discount > 0 && (
            <Badge 
              colorScheme="red" 
              position="absolute" 
              top="10px" 
              right="10px" 
              fontSize="0.8em"
              borderRadius="md"
              px={2}
              py={1}
            >
              -{product.discount}%
            </Badge>
          )}
        </Box>
      </Link>

      <Stack p={4} flex="1" spacing={2} justify="space-between">
        <Box>
          <Link to={`/product/${product.id}`}>
            <Text fontWeight="semibold" noOfLines={2} mb={2} _hover={{ color: 'brand.500' }}>
              {product.name}
            </Text>
          </Link>
          
          <Flex align="baseline" mb={2}>
            <Text fontWeight="bold" fontSize="xl" color="brand.500">
              {formatPrice(product.price)}
            </Text>
            {product.discount > 0 && (
              <Text ml={2} textDecoration="line-through" color="gray.500" fontSize="sm">
                {formatPrice(product.originalPrice)}
              </Text>
            )}
          </Flex>
        </Box>

        <Button 
          leftIcon={<FiShoppingCart />} 
          colorScheme="blue"
          size="sm"
        >
          Thêm vào giỏ
        </Button>
      </Stack>
    </Box>
  );
};

export default ProductCard; 