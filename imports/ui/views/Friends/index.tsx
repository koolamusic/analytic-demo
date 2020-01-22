import React from 'react';
import { Box, Input, InputGroup, Button } from '@chakra-ui/core'

export default class Friends extends React.Component {
    render() {
        return (
            <Box my='3' flex>
                <h1>Find your Friends and Send a Message</h1>
                <InputGroup my="2">
                    <Input placeholder="Enter username to Search" />
                    {/* <Button>Search</Button> */}
                </InputGroup>
            </Box>
        )
    }
}