import React, {  } from 'react';

import { InputGroup, Input, InputRightElement, Button, Box, Heading } from '@chakra-ui/core';


const Chat: React.FC = () => {


    return (
        <Box p={4}>
            <Heading as="h4" size="md">Welcome to the Chat Room!</Heading>
            <br />
            <div className="hint-box-container ">
                <div className="hide-hint-button"></div>
                <div className="hint-box">
                    <h2>Hint</h2>
                    <div>You can send messages anonymously or tell us your name. To set your name, just send a message saying "My name is _____" and we'll introduce you!</div>
                </div>
            </div>
            <br />
            <InputGroup size="md">
                <Input
                    pr="4.5rem"
                    type="text"
                    placeholder="Type Your Message"
                />
                <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={() => {
                        alert('You typed a message');
                    }}>Send</Button>
                </InputRightElement>
            </InputGroup>
        </Box>
    )
}

export default Chat
