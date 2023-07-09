import { Flex, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { BsHeart, BsHeartFill } from 'react-icons/bs'
export default function Like(props) {
  const [liked, setLiked] = useState(false);
  const [likes,setLikes] = useState(0)
//   console.log(props.likes)
  const updatelikes = () => {
    setLikes(likes+1);
    // axios.patch("/api/posts",{
    //     likes:likes,
    // })
  }
  return (
    <>
    <Flex
            p={4}
            direction='column'
            alignItems="center"
            justifyContent={'space-between'}
            roundedBottom={'sm'}
            
            cursor="pointer"
            onClick={() => setLiked(!liked)}>
            {liked ? (
              <BsHeartFill fill="red" fontSize={'24px'} onClick={()=>setLikes(likes-1)} />
            ) : (
              <BsHeart fontSize={'24px'} onClick={updatelikes} />
            )}
            {/* <Stack> */}
            <Text>{likes}</Text>
          {/* </Stack> */}
          </Flex>
    </>
  )
}
