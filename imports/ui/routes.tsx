import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link as RRLink } from "react-router-dom";
// import { } from '@chakra-ui/core'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Link, Icon, Flex, Button, useDisclosure, Input
} from "@chakra-ui/core";
import * as Analytics from './analytics'
import styled from '@emotion/styled'

// import components views here
import Layout from './Layout'
import App from '/imports/ui/App'
import Converter from './views/Converter';
import Wallet from './views/Wallet'
import Chat from './views/Chat'
import Friends from './views/Friends'

import Login from '/imports/ui/views/Auth/Login'
import Signup from './views/Auth/Signup';
import Kitchen from './views/Kitchen'


const NavLink = styled.li`
    text-decoration: none;
    padding: 3px 5px;
    font-weight: bold;
    list-style: none;
    color: white;
    `
const NavWrapper = styled.ul`
    text-decoration: none;
    position: relative;
    /* top: 0; */
    display: flex;
    background: #38a169;
    width: 100%;
    padding: .5rem;

`

export default function AppRouter(this: any) {
    // const routeLocation = props.location
    useEffect((): void => {
        this.window && Analytics.page()
    })

    return (
        <Router>
            <div>
                <NavWrapper>
                    <Flex dir="row" justifyContent="space-around">
                        <NavLink><Link href="/">Home</Link></NavLink>
                        <NavLink><Link href="/chat">Chat</Link> </NavLink>
                        <NavLink><Link href="/convert">Convert</Link> </NavLink>
                        <NavLink><Link href="/wallet">Wallet</Link></NavLink>
                        <AppDrawer />
                    </Flex>
                </NavWrapper>

                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Layout>
                    <Switch>
                        <Route path="/chat"><Chat /></Route>
                        <Route path="/convert"><Converter /></Route>
                        <Route path="/wallet"><Wallet /></Route>
                        <Route path="/friends"><Friends /></Route>
                        <Route path="/kitchen"><Kitchen /></Route>
                        <Route path='/login' component={Login} />
                        <Route path='/signup' component={Signup} />
                        <Route exact={true} path="/"><App /></Route>
                    </Switch>
                </Layout>
            </div>
        </Router>
    );
}

function AppDrawer() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();

    return (
        <>
            <Button ref={btnRef}
                style={{ position: 'absolute', right: 5, top: 5 }}
                variantColor="green" onClick={onOpen}> ☰ </Button>
            <Drawer
                isOpen={isOpen}
                style={{ backgroundColor: '#38a169' }}
                placement="right"
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Navigation</DrawerHeader>

                    <DrawerBody>
                        <NavLink><Link href="/">Home</Link></NavLink>
                        <NavLink><Link href="/chat">Chat</Link> </NavLink>
                        <NavLink><Link href="/convert">Convert</Link> </NavLink>
                        <NavLink><Link href="/wallet">Wallet</Link></NavLink>
                        <NavLink><Link href="/kitchen">Kitchen</Link></NavLink>
                        <NavLink><Link href="/login">Login</Link></NavLink>
                        <NavLink><Link href="/signup">Signup<Icon name="external-link" mx="2px" /></Link></NavLink>
                        <NavLink><Link href="/friends">Friends <Icon name="external-link" mx="2px" /></Link></NavLink>
                    </DrawerBody>

                    {/* <DrawerFooter>
                        <h1>Element Here</h1>
                    </DrawerFooter> */}
                </DrawerContent>
            </Drawer>
        </>
    );
}