import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, useToast, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    // States //
    const [show, setShow] = useState(false)
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [confirmpassword, setConfirmpassword] = useState();
    const [password, setPassword] = useState();
    const [pic, setPic] = useState();
    const [loading, setLoading] = useState(false);

    const toast = useToast();
    const navigate = useNavigate();

    // Functions //
    // showing / hiding password
    const handleClick = () => setShow(!show);

    // for uploading picture
    const postDetails = (pics) => {
        setLoading(true);
        if (pics === undefined) {
            toast({
                title: "Please Select an Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }

        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "chat-app");
            data.append("cloud_name", "doulbz5rj");
            fetch("https://api.cloudinary.com/v1_1/doulbz5rj/image/upload", {
                method: "post",
                body: data,
            }).then((res) => res.json())
              .then(data => {
                  setPic(data.url.toString().replace('http', 'https'));
                  console.log(data.url.toString().replace('http', 'https'));
                  setLoading(false);
              })
              .catch((err) => {
                  console.log(err);
                  setLoading(false);
              });
        } else {
            toast({
                title: "Please Select an Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }
    };

    const submitHandler = async () => {
        setLoading(true);
        // if not all fields inputted
        if (!name || !email || !password || !confirmpassword) {
            toast({
                title: "Please Fill all the Fields!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }
        // if password do not match with confirm password
        if (password !== confirmpassword) {
            toast({
                title: "Password Do Not Match!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }

        // POST request
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            }
            const { data } = await axios.post(
                "/api/user",
                { name, email, password, pic },
                config
                );
            
            // success notification
            toast({
                title: "Registration Successful!",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });

            localStorage.setItem('userInfo', JSON.stringify(data));

            setLoading(false);
            navigate('/chats')

        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
        }
    };


    // render //
    return (
        <VStack spacing='5px' color="black">
            {/* Name */}
            <FormControl id='first-name' isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                    placeholder='Enter Your Name'
                    onChange={(e) => setName(e.target.value)}
                />
            </FormControl>

            {/* Email */}
            <FormControl id='email1' isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                    placeholder='Enter Your Email'
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>

            {/* Password */}
            <FormControl id='password1' isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input
                        type={show ? "text" : 'password'}
                        placeholder='Enter Your Password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            {/* Confirm Password */}
            <FormControl id="password2" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup size="md">
                    <Input
                        type={show ? "text" : "password"}
                        placeholder="Confirm password"
                        onChange={(e) => setConfirmpassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            {/* Picture */}
            <FormControl id="pic">
                <FormLabel>Upload your Picture</FormLabel>
                <Input
                type="file"
                p={1.5}
                accept="image/*"
                onChange={(e) => postDetails(e.target.files[0])}
                />
            </FormControl>

            {/* Sign Up */}
            <Button
                colorScheme='blue'
                width='100%'
                style={{ marginTop: 15 }}
                onClick={submitHandler}
                isLoading={loading}
            >
                Sign Up
            </Button>
        </VStack>
    )
}

export default Signup
