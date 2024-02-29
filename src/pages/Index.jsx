import React, { useState } from "react";
import { Box, Button, Container, Flex, FormControl, FormLabel, Heading, Input, Stack, Text, useToast, VStack } from "@chakra-ui/react";
import { FaSignInAlt, FaUserPlus, FaThermometerHalf } from "react-icons/fa";

const apiBaseUrl = "https://backengine-dxjy.fly.dev";

const Index = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLoggingIn ? "/login" : "/signup";
    const url = `${apiBaseUrl}${endpoint}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("There was a problem with the request");
      }

      const data = await response.json();
      toast({
        title: isLoggingIn ? "Login Successful" : "Signup Successful",
        description: isLoggingIn ? "You are now logged in." : "You have been signed up successfully.",
        status: "success",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
      });
    }
  };

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading>Hybrid Digital Twin for HVAC</Heading>
          <Text mt={4}>Integrating the power of digital twins with HVAC systems for enhanced performance and predictive maintenance.</Text>
        </Box>

        <Box p={6} boxShadow="md" borderRadius="md">
          <Flex direction="column" align="center" justify="center">
            <FaThermometerHalf size="3em" />
            <Heading size="lg" my={4}>
              {isLoggingIn ? "Login" : "Sign Up"}
            </Heading>
          </Flex>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </FormControl>
              <Button leftIcon={isLoggingIn ? <FaSignInAlt /> : <FaUserPlus />} colorScheme="blue" type="submit" isFullWidth>
                {isLoggingIn ? "Login" : "Sign Up"}
              </Button>
            </Stack>
          </form>
          <Text mt={4} textAlign="center" onClick={() => setIsLoggingIn(!isLoggingIn)} cursor="pointer">
            {isLoggingIn ? "Need an account? Sign Up" : "Already have an account? Login"}
          </Text>
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;
