import React from 'react';
import { Button, ButtonGroup, Box, Avatar, AvatarBadge } from '@chakra-ui/core'

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

        <Box p="6" d="flex" flexDirection="column" alignItems="center">
          <ButtonGroup size="lg" variant="outline">
            <Button variantColor="green" >Currency Converter</Button>
            <Button variantColor="green" >Chat Room</Button>
            <Button variantColor="green" >Kitchen Menu</Button>
            <Button variantColor="green" >Find Friends</Button>
          </ButtonGroup>
        </Box>
        <section>

        </section>
      </div>
    );
  }
}
