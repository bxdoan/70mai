import React, { useState } from 'react';
import { 
  Box, 
  Flex, 
  Image, 
  Input, 
  InputGroup, 
  InputRightElement, 
  Button, 
  HStack, 
  IconButton, 
  Badge, 
  Menu, 
  MenuButton, 
  MenuList, 
  MenuItem,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  VStack,
  Text
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FiSearch, FiShoppingCart, FiUser, FiMenu } from 'react-icons/fi';
import { useCategories } from '../hooks/useCategories';
import logo from '../assets/logo.png';

const Header: React.FC = () => {
  const { categories } = useCategories();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to search results page with query
    window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
  };

  const cartItemsCount = 0; // This would be from a cart context/hook in a real app

  return (
    <Box as="header" borderBottom="1px" borderColor="gray.200" py={3} bg="white">
      <Flex maxW="container.xl" mx="auto" px={4} align="center" justify="space-between">
        {/* Mobile Menu Button */}
        <IconButton
          display={{ base: 'flex', md: 'none' }}
          aria-label="Open Menu"
          icon={<FiMenu />}
          onClick={onOpen}
          variant="ghost"
        />

        {/* Logo and Description */}
        <Flex direction="column" align={{ base: "center", md: "flex-start" }}>
          <Link to="/">
            <Image 
              src={logo}
              alt="70mai Logo"
              h="45px"
              objectFit="contain"
            />
          </Link>
          <Text 
            fontSize="xs" 
            color="gray.500" 
            mt={1} 
            display={{ base: 'none', md: 'block' }}
          >
            Đại lý phân phối chính thức tại Việt Nam
          </Text>
        </Flex>

        {/* Desktop Navigation */}
        <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
          <Link to="/">Trang chủ</Link>
          <Link to="/products">Sản phẩm</Link>
          <Menu>
            <MenuButton as={Button} variant="ghost" px={2}>
              Phân loại
            </MenuButton>
            <MenuList>
              {categories.map((category) => (
                <MenuItem key={category.id} as={Link} to={`/category/${category.id}`}>
                  {category.name}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Link to="/contact">Liên hệ</Link>
        </HStack>

        {/* Search, Account, Cart */}
        <HStack spacing={4}>
          <Box display={{ base: 'none', md: 'block' }}>
            <form onSubmit={handleSearch}>
              <InputGroup>
                <Input 
                  placeholder="Tìm kiếm..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <InputRightElement>
                  <IconButton 
                    aria-label="Search" 
                    icon={<FiSearch />} 
                    variant="ghost" 
                    type="submit"
                  />
                </InputRightElement>
              </InputGroup>
            </form>
          </Box>
          
          <IconButton 
            aria-label="User Account" 
            icon={<FiUser />} 
            variant="ghost"
            as={Link}
            to="/account"
          />
          
          <Box position="relative">
            <IconButton 
              aria-label="Shopping Cart" 
              icon={<FiShoppingCart />} 
              variant="ghost"
              as={Link}
              to="/cart"
            />
            {cartItemsCount > 0 && (
              <Badge 
                colorScheme="red" 
                position="absolute" 
                top="-5px" 
                right="-5px" 
                borderRadius="full"
              >
                {cartItemsCount}
              </Badge>
            )}
          </Box>
        </HStack>
      </Flex>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Flex direction="column" align="center">
              <Image 
                src={logo}
                alt="70mai Logo"
                h="40px"
                objectFit="contain"
              />
              <Text fontSize="xs" color="gray.500" mt={1}>
                Đại lý phân phối chính thức tại Việt Nam
              </Text>
            </Flex>
          </DrawerHeader>
          <DrawerBody>
            <VStack align="start" spacing={4}>
              <Link to="/" onClick={onClose}>Trang chủ</Link>
              <Text fontWeight="bold">Sản phẩm</Text>
              <VStack align="start" spacing={2} pl={4}>
                {categories.map((category) => (
                  <Link 
                    key={category.id} 
                    to={`/category/${category.id}`} 
                    onClick={onClose}
                  >
                    {category.name}
                  </Link>
                ))}
              </VStack>
              <Link to="/about" onClick={onClose}>Giới thiệu</Link>
              <Link to="/contact" onClick={onClose}>Liên hệ</Link>
              
              <Box pt={4} w="100%">
                <form onSubmit={handleSearch}>
                  <InputGroup>
                    <Input 
                      placeholder="Tìm kiếm..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <InputRightElement>
                      <IconButton 
                        aria-label="Search" 
                        icon={<FiSearch />} 
                        variant="ghost" 
                        type="submit"
                      />
                    </InputRightElement>
                  </InputGroup>
                </form>
              </Box>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Header; 