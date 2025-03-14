import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  SimpleGrid, 
  Flex, 
  Select, 
  Button, 
  RangeSlider, 
  RangeSliderTrack, 
  RangeSliderFilledTrack, 
  RangeSliderThumb, 
  Accordion, 
  AccordionItem, 
  AccordionButton, 
  AccordionPanel, 
  AccordionIcon,
  Icon,
  Input,
  Stack
} from '@chakra-ui/react';
import { FiFilter } from 'react-icons/fi';
import { useProducts } from '../hooks/useProducts';
import { Filter } from '../types';
import ProductCard from '../components/ProductCard';
import MainLayout from '../layouts/MainLayout';

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price);
};

const ProductPage: React.FC = () => {
  const [filter, setFilter] = useState<Filter>({
    minPrice: 0,
    maxPrice: 5000000,
    searchQuery: ''
  });
  const { products, isLoading } = useProducts(filter);
  const [sortBy, setSortBy] = useState('featured');

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const handlePriceChange = (values: number[]) => {
    setFilter({
      ...filter,
      minPrice: values[0],
      maxPrice: values[1]
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({
      ...filter,
      searchQuery: e.target.value
    });
  };

  // Sort products based on selection
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  return (
    <MainLayout
      title="Tất cả sản phẩm - 70mai Nha Trang"
      description="Khám phá tất cả sản phẩm chính hãng từ 70mai Nha Trang - Đại lý phân phối chính thức tại Việt Nam"
      image="https://70maivietnam.store/wp-content/themes/yootheme/cache/57/70mai-logo-575ce63c.webp"
      url="https://70mai.vercel.app/products"
    >
      <Container maxW="container.xl" py={8}>
        <Box mb={8}>
          <Heading as="h1" size="xl" mb={2}>
            Tất cả sản phẩm
          </Heading>
          <Text color="gray.600">Khám phá đầy đủ các sản phẩm chính hãng từ 70mai</Text>
        </Box>

        <Flex direction={{ base: 'column', md: 'row' }} gap={8}>
          {/* Filters Sidebar */}
          <Box w={{ base: '100%', md: '250px' }}>
            <Accordion defaultIndex={[0]} allowMultiple>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left" fontWeight="bold">
                      <Icon as={FiFilter} mr={2} />
                      Bộ lọc
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Stack spacing={4}>
                    <Box>
                      <Text mb={2} fontWeight="medium">Tìm kiếm</Text>
                      <Input 
                        placeholder="Tìm sản phẩm..." 
                        value={filter.searchQuery}
                        onChange={handleSearchChange}
                      />
                    </Box>
                    
                    <Box>
                      <Text mb={2} fontWeight="medium">Khoảng giá</Text>
                      <Flex justify="space-between" mb={2}>
                        <Text fontSize="sm">{formatPrice(filter.minPrice || 0)}</Text>
                        <Text fontSize="sm">{formatPrice(filter.maxPrice || 5000000)}</Text>
                      </Flex>
                      <RangeSlider
                        aria-label={['min', 'max']}
                        min={0}
                        max={5000000}
                        step={100000}
                        defaultValue={[filter.minPrice || 0, filter.maxPrice || 5000000]}
                        onChange={handlePriceChange}
                        colorScheme="blue"
                      >
                        <RangeSliderTrack>
                          <RangeSliderFilledTrack />
                        </RangeSliderTrack>
                        <RangeSliderThumb index={0} />
                        <RangeSliderThumb index={1} />
                      </RangeSlider>
                    </Box>
                  </Stack>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>

          {/* Products Grid */}
          <Box flex="1">
            <Flex 
              justify="space-between" 
              align="center" 
              mb={6}
              flexDir={{ base: 'column', sm: 'row' }}
              gap={{ base: 4, sm: 0 }}
            >
              <Text>Hiển thị {sortedProducts.length} sản phẩm</Text>
              <Flex align="center">
                <Text mr={2} whiteSpace="nowrap">Sắp xếp theo:</Text>
                <Select value={sortBy} onChange={handleSortChange} w="200px">
                  <option value="featured">Nổi bật</option>
                  <option value="price-asc">Giá: Thấp đến cao</option>
                  <option value="price-desc">Giá: Cao đến thấp</option>
                  <option value="name-asc">Tên: A-Z</option>
                  <option value="name-desc">Tên: Z-A</option>
                </Select>
              </Flex>
            </Flex>

            {isLoading ? (
              <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={8}>
                {[...Array(8)].map((_, i) => (
                  <Box 
                    key={i} 
                    height="300px" 
                    borderRadius="lg" 
                    bg="gray.100"
                  />
                ))}
              </SimpleGrid>
            ) : sortedProducts.length > 0 ? (
              <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={8}>
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </SimpleGrid>
            ) : (
              <Box textAlign="center" py={10}>
                <Heading as="h3" size="md">
                  Không tìm thấy sản phẩm
                </Heading>
                <Text mt={2}>
                  Không có sản phẩm nào phù hợp với điều kiện tìm kiếm của bạn.
                </Text>
                <Button 
                  mt={4} 
                  colorScheme="blue" 
                  onClick={() => setFilter({ minPrice: 0, maxPrice: 5000000, searchQuery: '' })}
                >
                  Xóa bộ lọc
                </Button>
              </Box>
            )}
          </Box>
        </Flex>
      </Container>
    </MainLayout>
  );
};

export default ProductPage;