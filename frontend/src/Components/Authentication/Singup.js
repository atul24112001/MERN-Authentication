import React, { useEffect, useState } from 'react'
import { Button, Center, FormControl, FormLabel, Input, InputGroup, InputRightElement, Text, useToast, VStack } from "@chakra-ui/react"
import { useDispatch, useSelector } from 'react-redux'
import { StyledInput } from '../UI/StyledInputs';

import { ClearErrorsAction, SingUpAction } from '../../store/auth-slice';

export default function Singup() {
    const [details, setDetails] = useState({ name: "", email: "", password: "", confirm: "", picture: null })
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const Toast = useToast();
    const dispatch = useDispatch();
    const SingupError = useSelector(state => state.auth.SingupError);
    const [isSingUp, setisSingUp] = useState(false);

    const fileHandler = (e) => {
        setLoading(true);
        const uploadedPic = e.target.files[0];
        console.log(uploadedPic);
        if (uploadedPic === undefined) {
            Toast({
                title: 'Please Select an Image!',
                // description: "We've created your account for you.",
                status: 'warning',
                duration: 3000,
                isClosable: true,
                position: "top-left"
            });
            return;
        }
        if (uploadedPic.type === "image/jpeg" || uploadedPic.type === "image/png") {
            const data = new FormData();
            data.append("file", uploadedPic);
            data.append("upload_preset", "chat-app");
            data.append("cloude_name", "dm97znslm");
            fetch("https://api.cloudinary.com/v1_1/dm97znslm/image/upload", {
                method: 'post',
                body: data,
            }).then(res => res.json()).then(pic => {
                setDetails({ ...details, picture: pic.url.toString() })
                setLoading(false);
            }).catch(error => {
                setLoading(false);
                console.log(error);
                Toast({
                    title: "Can't Upload Picture!",
                    description: error.message,
                    status: 'warning',
                    duration: 3000,
                    isClosable: true,
                    position: "top-left"
                })
            })
        } else {
            Toast({
                title: "Invalid Image Formate.",
                description: "Plese Select Image in JPEG or PNG Formate.",
                status: 'warning',
                duration: 3000,
                isClosable: true,
                position: "top-left"
            })
        }
    }

    const SingUpHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!details.name.trim() || !details.email.trim() || !details.password.trim() || !details.confirm.trim()) {
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
        } else if (details.password !== details.confirm) {
            Toast({
                title: "Password Dosen't Match.",
                description: "Please Match both Password and Confirm Password!",
                status: 'warning',
                duration: 3000,
                isClosable: true,
                position: "top-left"
            });
            setDetails({ ...details, password: "", confirm: "" })
            setLoading(false);
            return;
        }

        dispatch(SingUpAction(details, {
            headers: {
                "Content-Type": "application/json"
            }
        }));

        setisSingUp(true);
        setDetails({ name: "", email: "", password: "", confirm: "", picture: null });
        setLoading(false);
    }


    useEffect(() => {
        if (SingupError) {
            Toast({
                title: "Can't SingUp",
                description: SingupError,
                status: 'warning',
                duration: 3000,
                isClosable: true,
                position: "top-left"
            });
        }

        return () => {
            dispatch(ClearErrorsAction())
        }
    }, [SingupError, Toast, dispatch, isSingUp]);


    return (
        <form onSubmit={SingUpHandler}>
            <VStack>
                {isSingUp && <Center>
                    <Text fontSize='xl' color='whatsapp.400'>SingUp Successfull!</Text>
                </Center>}
                <StyledInput
                    title="Name"
                    value={details.name}
                    onChange={(e) => setDetails({ ...details, name: e.target.value })}
                    required={true}
                    placeholder="Enter Your Name"
                />
                <StyledInput
                    type='email'
                    title="E-mail Address"
                    value={details.email}
                    onChange={(e) => setDetails({ ...details, email: e.target.value })}
                    required={true}
                    placeholder="Enter Your E-amil"
                />
                <FormControl isRequired>
                    <FormLabel htmlFor='spassword'>Password</FormLabel>
                    <InputGroup size='md'>
                        <Input
                            _focus={{ outline: "2px solid #edf2f7", bgColor: "white" }}
                            variant='filled'
                            pr='4.5rem'
                            id='spassword'
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
                <FormControl isRequired>
                    <FormLabel htmlFor='confirm'>Confirm Password</FormLabel>
                    <InputGroup size='md'>
                        <Input
                            _focus={{ outline: "2px solid #edf2f7", bgColor: "white" }}
                            variant='filled'
                            // isInvalid={details.password !== details.confirm}
                            pr='4.5rem'
                            id='confirm'
                            value={details.confirm}
                            placeholder='Confirm password'
                            onChange={(e) => setDetails({ ...details, confirm: e.target.value })}
                            type={showConfirm ? 'text' : 'password'}
                        />
                        <InputRightElement width='4.5rem'>
                            <Button variant='ghost' _focus={{ outline: 0 }} h='1.75rem' size='sm' onClick={() => setShowConfirm(!showConfirm)}>
                                {showConfirm ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor='file'>Chose Profile Picture</FormLabel>
                    <Input border={0} accept='image/*' id='file' type="file" p={1.5} onChange={fileHandler} />
                </FormControl>

                <Button _hover={{ color: "white", bgColor: "#011627d1" }} isLoading={loading} type='submit' bgColor='#011627' color="white" isFullWidth={true} style={{ marginTop: 15 }}>Sing Up</Button>
                <Button colorScheme='gray' isFullWidth={true} mt={5}>Cancel</Button>
            </VStack>
        </form>
    )
}
