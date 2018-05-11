import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import "./index.css";
import App from "./App";
import JobOffersList from "./JobOffer/Pages/JobOffersList";
import AddJobOffer from "./JobOffer/Pages/AddJobOffer";
import EditJobOffer from "./JobOffer/Pages/EditJobOffer";

//Main Layout and route definition
ReactDOM.render(
	<Router>
		<div>
			<App />
			<div className="container">
				<Route exact path="/" component={JobOffersList} />
				<Route path="/add" component={AddJobOffer} />
				<Route path="/edit/:id" component={EditJobOffer} />
			</div>
		</div>
	</Router>,
	document.getElementById("root")
);
registerServiceWorker();
