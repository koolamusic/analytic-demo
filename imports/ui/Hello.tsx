import React from 'react';
import { Button, ButtonGroup, Stack, Box, Avatar, AvatarBadge } from '@chakra-ui/core'

export default class Hello extends React.Component {
  state = {
    counter: 0,
  }

  increment() {
    this.setState({
      counter: this.state.counter + 1
    });
  }

  render() {
    return (
      <div>
        <Box d="flex" flexDirection="column" alignItems="center" justifyContent="center">
          <Avatar name="Kwame" >
            <AvatarBadge size="1.25em" bg="green.500" />
          </Avatar>
          Hello Kwame
        </Box>

        <Stack spacing={3}>
          <Button variant="outline" size="lg" variantColor="green" >Currency Converter</Button>
          <Button variant="outline" size="lg" variantColor="green" >Chat Room</Button>
          <Button variant="outline" size="lg" variantColor="green" >Kitchen Menu</Button>
          <Button variant="outline" size="lg" variantColor="green" >Find Friends</Button>
          <Button variant="outline" size="lg" variantColor="green" >Fund Wallet</Button>
        </Stack>
      </div>
    );
  }
}
