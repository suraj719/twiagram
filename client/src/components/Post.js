import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Img,
  Flex,
  Center,
  IconButton,
  Spacer,
  useDisclosure,
  Button,
  Input,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { BsHeartFill, BsHeart, BsPencilFill } from "react-icons/bs";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";
import { DeleteIcon, ExternalLinkIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useAuthUser } from "react-auth-kit";
import { useToast } from "@chakra-ui/react";
import Loader from "./Loader";
export default function Post() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [post, setPost] = useState("");
  const [isloading, setIsloading] = useState(false);
  // const [caption,setCaption] = useState("")
  // const captionref = useRef(null)
  const [newcaption,setNewcaption] = useState("");
  const { id } = useParams();
  const auth = useAuthUser();
  const fetchdata = () => {
    setIsloading(true);
    fetch(`https://twiagrambackend.onrender.com/api/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data.post);
        setLikes(data.post.likes);
        setNewcaption(data.post.caption)
        setIsloading(false);
      });
  };
  useEffect((id) => {
    fetchdata();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const updatelikes = async () => {
    try {
      await axios.patch(`https://twiagrambackend.onrender.com/api/posts/${id}`, {
        likes: likes + 1,
      });
    } catch (error) {}
    setLikes(likes + 1);
  };

  
  const handlesave = async () => {
    try {
      await axios.patch(`https://twiagrambackend.onrender.com/api/posts/${id}`,{
        caption:newcaption,
      })
      onClose();
    } catch (error) {
      console.log(error)
    }
  }

  const deletepost = async () => {
    try {
      await axios.delete(`https://twiagrambackend.onrender.com/api/posts/${id}`);
      navigate("/posts");
    } catch (error) {
      console.log(error);
    }
  };
  const copyurl = async () => {
    const el = document.createElement("input");
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    toast({
      position: "top-right",
      title: "url copied to clipboard.",
      status: "success",
      duration: 1000,
      isClosable: true,
    });
  };
  return (
    <>
      {isloading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <Center py={6}>
            <Box
              w="lg"
              rounded={"lg"}
              my={5}
              mx={[0, 5]}
              overflow={"hidden"}
              bg="white"
              borderColor="black"
              style={{
                boxShadow:
                  "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
              }}
            >
              <Flex>
                <Box mt={2} ms={2}>
                  @{post.user}
                </Box>
                <Spacer />
                <Menu>
                  <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<HamburgerIcon />}
                    variant="outline"
                  />
                  <MenuList>
                    <MenuItem icon={<ExternalLinkIcon />} onClick={copyurl}>
                      Share
                    </MenuItem>
                    {post.user === auth().username ? (
                      <>
                        <MenuItem icon={<BsPencilFill />} onClick={onOpen}>
                          edit post
                        </MenuItem>
                        <Modal isOpen={isOpen} onClose={onClose}>
                          <ModalOverlay />
                          <ModalContent>
                            <ModalHeader>Edit Caption</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                              <Input type="text" placeholder="enter new caption" value={newcaption} onChange={(e)=>setNewcaption(e.target.value)} />
                            </ModalBody>

                            <ModalFooter>
                              <Button
                                variant={'ghost'}
                                mr={3}
                                onClick={onClose}
                              >
                                Close
                              </Button>
                              <Button colorScheme="blue" onClick={handlesave}>save</Button>
                            </ModalFooter>
                          </ModalContent>
                        </Modal>
                        <MenuItem icon={<DeleteIcon />} onClick={deletepost}>
                          Delete post
                        </MenuItem>
                      </>
                    ) : (
                      <></>
                    )}
                  </MenuList>
                </Menu>
              </Flex>
              <Box borderBottom={"1px"} borderColor="black">
                <Img
                  src={post.image}
                  roundedTop={"sm"}
                  objectFit="cover"
                  h="full"
                  w="full"
                  alt={"Blog Image"}
                />
              </Box>
              <Flex>
                <Box p={4}>
                  <Heading color={"black"} fontSize={"2xl"}>
                    {newcaption}
                  </Heading>
                </Box>
                <Spacer />
                <Flex
                  p={4}
                  direction="column"
                  alignItems="center"
                  justifyContent={"space-between"}
                  roundedBottom={"sm"}
                  cursor="pointer"
                  onClick={() => setLiked(!liked)}
                >
                  {liked ? (
                    <BsHeartFill
                      fill="red"
                      fontSize={"24px"}
                      onClick={() => setLikes(likes - 1)}
                    />
                  ) : (
                    <BsHeart fontSize={"24px"} onClick={updatelikes} />
                  )}
                  <Text>{likes}</Text>
                </Flex>
              </Flex>
            </Box>
          </Center>
        </>
      )}
    </>
  );
}
