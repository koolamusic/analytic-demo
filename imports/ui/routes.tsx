import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link as RRLink } from "react-router-dom";
import { Link, Icon } from '@chakra-ui/core'
import * as Analytics from './analytics'

// import components views here
import App from '/imports/ui/App'
import Converter from './views/Converter';
import Wallet from './views/Wallet'

export default function AppRouter(this: any) {
    // const routeLocation = props.location
    useEffect((): void => {
        this.window && Analytics.page()
    })

    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/convert">Convert</Link> </li>
                        <li><Link href="/wallet">Wallet</Link></li>
                        <li><Link href="/users">Users <Icon name="external-link" mx="2px" />                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Switch>
                    <Route path="/convert"><Converter /></Route>
                    <Route path="/wallet"><Wallet /></Route>
                    <Route path="/users"><Users /></Route>
                    <Route path="/"><App /></Route>
                </Switch>
            </div>
        </Router>
    );
}


function Users() {
    return <h2>Users</h2>;
}