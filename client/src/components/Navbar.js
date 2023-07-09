
import {
  Box,
  Flex,
  Link,
  Button,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import {useIsAuthenticated} from 'react-auth-kit';
import { useSignOut } from 'react-auth-kit'
import Cp from './Cp';
export default function Navbar() {
  const isAuthenticated = useIsAuthenticated()
  const logout = useSignOut()
  let isloggedin = isAuthenticated()
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Link href={isloggedin?"/posts":"/"}>TWIAGRAM</Link>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={6}>
            {isloggedin?(<>
              <Stack style={{marginTop:"-15px"}}><Cp/></Stack>
              <Link href="/login"><Button colorScheme={'teal'} onClick={()=>logout()}>Logout</Button></Link>
            </>) :(<>
                <Link href="/login"><Button colorScheme={'teal'}>Login</Button></Link>
            </>)}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}