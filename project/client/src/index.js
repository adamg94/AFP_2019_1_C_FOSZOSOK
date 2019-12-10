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
import Palace from './Palace';
import WheatField from './WheatField';
import WareHouse from './Warehouse';
import MerchWorkshop from './MerchWorkshop';
import Hideout from './Hideout';
import Statue from './Statue';
import Wall from './Wall'
import MetalFurnace from './MetalFurnace';
import Merch from './Merch'
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
			<Route path="/palace">
				<Navigation />
				<Palace />
			</Route>
			<Route path="/merchworkshop">
				<Navigation />
				<MerchWorkshop />
			</Route>
			<Route path="/hideout">
				<Navigation />
				<Hideout />
			</Route>
			<Route path="/statue">
				<Navigation />
				<Statue />
			</Route>
			<Route path="/wall">
				<Navigation />
				<Wall />
			</Route>
			<Route path="/metalfurnace">
				<Navigation />
				<MetalFurnace />
			</Route>
			<Route path="/merch">
				<Navigation />
				<Merch />
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
