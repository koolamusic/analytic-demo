import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link as RRLink } from "react-router-dom";
import { Link, Icon, Flex } from '@chakra-ui/core'
import * as Analytics from './analytics'
import styled from '@emotion/styled'

// import components views here
import Layout from './Layout'
import App from '/imports/ui/App'
import Converter from './views/Converter';
import Wallet from './views/Wallet'
import Chat from './views/Chat'

import Login from '/imports/ui/views/Auth/Login'
import Signup from './views/Auth/Signup';
import Kitchen from './views/Kitchen'


const NavLink = styled.li`
    text-decoration: none;
    padding: 2px 5px;
    font-weight: bold;
    list-style: none;
    color: white;
    `
const NavWrapper = styled.ul`
    text-decoration: none;
    display: flex;
    /* flex-grow: 1; */
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
                <Flex>
                    <NavWrapper>
                        <NavLink><Link href="/">Home</Link></NavLink>
                        <NavLink><Link href="/chat">Chat</Link> </NavLink>
                        <NavLink><Link href="/convert">Convert</Link> </NavLink>
                        <NavLink><Link href="/wallet">Wallet</Link></NavLink>
                        {/* <NavLink><Link href="/login">Login</Link></NavLink> */}
                        {/* <NavLink><Link href="/signup">Signup</Link></NavLink> */}
                        <NavLink><Link href="/kitchen">Kitchen</Link></NavLink>
                        {/* <NavLink><Link href="/users">Users <Icon name="external-link" mx="2px" /></Link></NavLink> */}
                    </NavWrapper>
                </Flex>

                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Layout>
                    <Switch>
                        <Route path="/chat"><Chat /></Route>
                        <Route path="/convert"><Converter /></Route>
                        <Route path="/wallet"><Wallet /></Route>
                        <Route path="/users"><Users /></Route>
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


function Users() {
    return <h2>Users</h2>;
}
