//components/welcomepage.js
import React from 'react';
import { Box, Text, Button } from '@chakra-ui/react';

const WelcomePage = ({ onEnter }) => {
  return (
    <Box textAlign="center" mt={10}>
      <Text fontSize="2xl" mb={4}>Welcome to Movie List App</Text>
      <Button onClick={onEnter} colorScheme="blue" size="lg">
        Enter
      </Button>
    </Box>
  );
};

export default WelcomePage;