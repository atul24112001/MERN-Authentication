import React, { useEffect, useState } from 'react';
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, useToast, VStack } from "@chakra-ui/react";
import { useDispatch, useSelector } from 'react-redux';
import { ClearErrorsAction, LoginAction } from '../../store/auth-slice';
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const [details, setDetails] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const Toast = useToast();
    const LoginError = useSelector(state => state.auth.LoginError);
    const isAuth = useSelector(state => state.auth.isLogedIn)
    const navigate = useNavigate();

    const loginHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!details.email.trim() || !details.password.trim()) {
            Toast({
                title: 'Invalid Input',
                description: "Please fill all the inputs Correctly!",
                status: 'warning',
                duration: 3000,
                isClosable: true,
                position: "top-left"
            });
            setLoading(false);
            return;
        }

        dispatch(LoginAction(details, {
            headers: {
                "Content-Type": "application/json"
            }
        }));
        navigate("/chats")
        if (isAuth) {
            Toast({
                title: "Singup Successfully!",
                description: "You have registerd to chat-app Successfully!",
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: "top-left"
            });
        }

        setLoading(false);
    }


    useEffect(() => {
        if (LoginError) {
            Toast({
                title: "Can't SingUp",
                description: LoginError,
                status: 'warning',
                duration: 3000,
                isClosable: true,
                position: "top-left"
            });
        }

        return () => {
            dispatch(ClearErrorsAction());
        }
    }, [Toast, LoginError, dispatch]);


    return (
        <form onSubmit={loginHandler}>
            <VStack>
                <FormControl isRequired>
                    <FormLabel htmlFor='Email'>E-mail Address</FormLabel>
                    <Input type='email' _focus={{ outline: "2px solid #edf2f7", bgColor: "white" }} value={details.email} placeholder="Enter Your Email" id='Email' variant="filled" onChange={(e) => setDetails({ ...details, email: e.target.value })} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel htmlFor='password'>Password</FormLabel>
                    <InputGroup size='md'>
                        <Input
                            _focus={{ outline: "2px solid #edf2f7", bgColor: "white" }}
                            variant='filled'
                            pr='4.5rem'
                            id='password'
                            value={details.password}
                            onChange={(e) => setDetails({ ...details, password: e.target.value })}
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Enter password'
                        />
                        <InputRightElement width='4.5rem'>
                            <Button variant='ghost' _focus={{ outline: 0 }} h='1.75rem' size='sm' onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
                <Button isLoading={loading} _hover={{ color: "white", bgColor: "#011627d1" }} type='submit' bgColor='#011627' color="white" isFullWidth={true} style={{ marginTop: 15 }}  >Login</Button>
                <Button onClick={() => setDetails({ email: "guest345@gmail.com", password: "guest345" })} _hover={{ color: "black" }} bgColor='red.500' color="white" isFullWidth={true} style={{ marginTop: 5 }}>Get Guest User Credentials</Button>
            </VStack>
        </form>
    )
}
