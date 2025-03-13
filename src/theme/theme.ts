import { extendTheme } from '@chakra-ui/react';

const colors = {
  brand: {
    50: '#f0f5ff',
    100: '#d0e1ff',
    200: '#b0cdff',
    300: '#90b9ff',
    400: '#70a5ff',
    500: '#5091ff', // Primary color - blue
    600: '#3076d9',
    700: '#1a5cb3',
    800: '#0a418d',
    900: '#002766',
  },
  secondary: {
    50: '#fff5f0',
    100: '#ffe1d0',
    200: '#ffcdaf',
    300: '#ffb98f',
    400: '#ffa46e',
    500: '#ff904e', // Secondary color - orange
    600: '#e67842',
    700: '#cc6036',
    800: '#b2482a',
    900: '#99301e',
  },
};

const fonts = {
  heading: 'Roboto, sans-serif',
  body: 'Roboto, sans-serif',
};

const components = {
  Button: {
    variants: {
      primary: {
        bg: 'brand.500',
        color: 'white',
        _hover: {
          bg: 'brand.600',
        },
        _active: {
          bg: 'brand.700',
        },
      },
      secondary: {
        bg: 'secondary.500',
        color: 'white',
        _hover: {
          bg: 'secondary.600',
        },
        _active: {
          bg: 'secondary.700',
        },
      },
    },
    defaultProps: {
      variant: 'primary',
    },
  },
  Heading: {
    baseStyle: {
      fontWeight: 'bold',
      color: 'gray.800',
    },
  },
};

const theme = extendTheme({ colors, fonts, components });

export default theme; 