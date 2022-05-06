import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import React from 'react'
import Login from '../Components/Authentication/Login'
import Singup from '../Components/Authentication/Singup'

export default function Authentication() {
    return (
        <Container maxW="100vw" centerContent minH="100vh" bgColor='#011627' color="white" >
            <Box borderRadius='lg' w="40vw" mt={5} mb={5} p={2} bgColor='white' color="black">
                <Text fontSize='2xl' align='center' fontWeight='bold'>Chat App</Text>
            </Box>
            <Box borderRadius='lg' w='40vw' p={4} bgColor='white' color="black">
                <Tabs isFitted variant='soft-rounded'>
                    <TabList mb={4}>
                        <Tab _focus={{ outline: 0 }}>Login</Tab>
                        <Tab _focus={{ outline: 0 }}>Sing Up</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Login />
                        </TabPanel>
                        <TabPanel>
                            <Singup />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Container>
    )
}
