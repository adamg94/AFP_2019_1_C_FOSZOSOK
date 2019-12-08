import React from 'react';
import ReactDOM from 'react-dom';
import Village from './Village';
import Login from './Login';
import Navigation from './Navigation';
import Lumberyard from './Lumberyard';
import Brickyard from './Brickyard';
import Ironmine from './Ironmine';
import Temple from './Temple';
import Mill from './Mill';
import WheatField from './WheatField';
import WareHouse from './Warehouse';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const routing = (
	<main>
		<Router>
			<Route exact path="/">
				<Login />
			</Route>
			<Route path="/village">
				<Navigation />
				<Village />
			</Route>
			<Route path="/lumberyard">
				<Navigation />
				<Lumberyard />
			</Route>
			<Route path="/brickyard">
				<Navigation />
				<Brickyard />
			</Route>
			<Route path="/ironmine">
				<Navigation />
				<Ironmine />
			</Route>
			<Route path="/temple">
				<Navigation />
				<Temple />
			</Route>
			<Route path="/wheatfield">
				<Navigation />
				<WheatField />
			</Route>
			<Route path="/mill">
				<Navigation />
				<Mill />
			</Route>
			<Route path="/warehouse">
				<Navigation />
				<WareHouse />
			</Route>
		</Router>
	</main>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
