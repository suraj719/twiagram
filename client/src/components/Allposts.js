import { Link } from '@chakra-ui/react';
import Loader from "./Loader"
import {
  Box,
  Heading,
  Text,
  Img,
  Flex,
  Center,
  HStack,
} from '@chakra-ui/react';
import { BsArrowUpRight } from 'react-icons/bs';

import React from 'react'
import { useEffect, useState } from 'react';

// import {useAuthUser} from 'react-auth-kit'
// import Post from "./Post"
export default function Allposts() {
  // const auth = useAuthUser()
  const [allimgs,setallimgs] = useState([]);
  const [isloading,setIsloading] = useState(false);
  const fetchdata = () => {
    setIsloading(true)
    fetch("https://twiagrambackend.onrender.com/api/posts")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.posts);
        // setCases(data.data.posts);
        setallimgs(data.posts);
        setIsloading(false);
      });
  }
  useEffect(() => {
    fetchdata();
  }, []);
  return (
  <>
  {isloading ? (<>
    <Loader />
  </>) : (<> 
    <div>
      {allimgs.map(post=>{
        return(
          <div key={post._id}>
            <Link href={`/posts/${post._id}`} >
            <Center py={6}>
      <Box
        w="lg"
        rounded={'sm'}
        my={5}
        mx={[0, 5]}
        overflow={'hidden'}
        bg="white"
        borderColor="black"
        style={{
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
          }}
        >
        <Box my={2} ms={2}>@{post.user}</Box>
        <Box borderBottom={'1px'} borderColor="black">
          <Img
            src={post.image}
            roundedTop={'sm'}
            objectFit="cover"
            h="full"
            w="full"
            alt={'Blog Image'}
          />
        </Box>
        <Box p={4}>
          <Heading color={'black'} fontSize={'2xl'}>
            {post.caption}
          </Heading>
        </Box>
        <HStack>
          <Flex
            p={4}
            alignItems="center"
            justifyContent={'space-between'}
            roundedBottom={'sm'}
            cursor={'pointer'}
            w="full">
            <Text fontSize={'md'} fontWeight={'semibold'}>
              View more
            </Text>
            <BsArrowUpRight />
          </Flex>
          {/* <Like likes={post.likes}/> */}
          
        </HStack>
      </Box>
    </Center>
            </Link>
          </div>
        )
      })}
    </div>
  </>)}
</>
  )
}
