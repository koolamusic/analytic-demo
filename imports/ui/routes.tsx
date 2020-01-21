import React from "react";
import { BrowserRouter as Router, Switch, Route, Link as RRLink } from "react-router-dom";
import { Link, Icon } from '@chakra-ui/core'

// import components home
import App from '/imports/ui/App'


export default function AppRouter() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <li>
                            <Link href="/about">About</Link>
                        </li>
                        <li>
                            <Link href="/users">
                                Users <Icon name="external-link" mx="2px" />
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Switch>
                    <Route path="/about">
                        <About />
                    </Route>
                    <Route path="/users">
                        <Users />
                    </Route>
                    <Route path="/">
                        <App />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}


function About() {
    return <h2>About</h2>;
}

function Users() {
    return <h2>Users</h2>;
}
