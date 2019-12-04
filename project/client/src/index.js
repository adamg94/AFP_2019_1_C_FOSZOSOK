import React from 'react';
import ReactDOM from 'react-dom';
import Village from './Village'
import Login from './Login';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from "react-router-dom"

const routing = (
    <main>
        <Router>
            <Route exact path="/">
                <Login />
            </Route>
            <Route path="/village">
                <Village />
            </Route>
        </Router>
    </main>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
