import React, { useState } from 'react';
import { InputGroup, Input, InputRightElement, Button, Box, Heading } from '@chakra-ui/core';
import styled from '@emotion/styled'
import Wrapper from '../../Layout';

const InputWrapper = styled.div`
    position: absolute;
    bottom: 3px;
    max-height: 80px;
    padding: 3px;
    border-top: 1px solid #ddd;
    margin: 0;
`

const Announcement = styled.div`
    position: absolute;
    top: 0;
    border-bottom: 1px solid #ccc;
`
const MessageWrapper = styled.div`
    position: relative;
`

const Chat: React.FC = () => {
    const [value, setValue] = useState<string>('')

    const handleChange = (event) => {
        setValue(event.target.value);
        console.log(value);
    }

    const buttonClick = (e) => {
        // This function executes when user clicks the Button or uses the Enter value
        e.preventDefault()
        console.log('I EXECCUTE BUTTON', e, value);
        // console.log(e)
    }
    return (
        <React.Fragment>
            <MessageWrapper>
                <Box p={1}>
                    <Announcement>
                        <Heading as="h6" size="xs">Welcome to the Chat Room!</Heading>
                        <div className="hint-box-container ">
                            <small style={{ lineHeight: '1px' }}>To set your name, just send a message saying "My name is _____" and we'll introduce you!</small>
                        </div>
                    </Announcement>
                </Box>
            </MessageWrapper>


            <InputWrapper>
                <form onSubmit={buttonClick}>
                    <InputGroup size="md">
                        <Input
                            pr="4.5rem"
                            type="text"
                            placeholder="Type Your Message"
                            onChange={handleChange}
                        />
                        <InputRightElement width="4.5rem">
                            <Button type="submit" h="1.75rem" size="sm" onClick={buttonClick}>Send</Button>
                        </InputRightElement>
                    </InputGroup>
                </form>

            </InputWrapper>
        </React.Fragment>
    )
}

export default Chat
