import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import axios from "axios";
import { useState } from "react";
import { useSignIn } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { useToast } from '@chakra-ui/react'

export default function Login() {
  const toast = useToast()
  const navigate = useNavigate();
  const signIn = useSignIn();
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [newpass,setNewpass] = useState("");
  let [newemail,setNewemail] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure()
  
  const handlelogin = (e) => {
    e.preventDefault();
    axios
      .post("https://twiagrambackend.onrender.com/api/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        if (
          signIn({
            token: res.data.token,
            expiresIn: 3600,
            tokenType: "Bearer",
            authState: { username: username },
          })
        ) {
          navigate("/posts");
        } else {
          console.log("failed to login");
        }
      });
    // navigate("/")
  };
  const handleforgot = async (e) => {
    // console.log("s");
    e.preventDefault();
    try {
     await axios.patch("https://twiagrambackend.onrender.com/api/forgot",{
        email:newemail,
        password:newpass
      })
      toast({
        position:"top-right",
        title: 'succesfully resetted the password',
        status: 'success',
        duration: 1000,
        isClosable: true,
      })
      navigate("/signup");

    } catch (error) {
      console.log(error)
    }
   
  }
  return (
    <form onSubmit={handlelogin}>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} w={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Sign in</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              Don't have an account?{" "}
              <Link color={"blue.400"} href="/signup">
                Signup
              </Link>{" "}
              ✌️
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="email" isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  {/* <Link color={"blue.400"}>Forgot password?</Link> */}
                  <Button color={"blue.400"} onClick={onOpen}>Forgot Password? </Button>

                  <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Reset Password</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        <Flex
                          // minH={"100vh"}
                          align={"center"}
                          justify={"center"}
                          // bg={useColorModeValue("gray.50", "gray.800")}
                        >
                          <Stack
                            spacing={4}
                            w={"full"}
                            maxW={"md"}
                            bg={useColorModeValue("white", "gray.700")}
                            rounded={"xl"}
                            boxShadow={"lg"}
                            p={6}
                            my={12}
                          >
                          <form>
                            <FormControl id="email" isRequired>
                              <FormLabel>Email address</FormLabel>
                              <Input
                                placeholder="your-email@example.com"
                                _placeholder={{ color: "gray.500" }}
                                type="email"
                                onChange={(e)=>setNewemail(e.target.value)}
                              />
                            </FormControl>
                            <FormControl id="password" isRequired>
                              <FormLabel>New Password</FormLabel>
                              <Input type="password" onChange={(e)=>setNewpass(e.target.value)} />
                            </FormControl>
                            <Stack spacing={6}>
                              <Button
                              type='submit'
                              onClick={handleforgot}
                              my={7}
                                // onClick={()=>console.log("S")}
                                bg={"blue.400"}
                                color={"white"}
                                _hover={{
                                  bg: "blue.500",
                                }}
                                
                              >
                                Submit
                              </Button>
                            </Stack>
                        </form>
                          </Stack>
                        </Flex>
                      </ModalBody>
                    </ModalContent>
                  </Modal>
                </Stack>
                <Button
                  type="submit"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </form>
  );
}
