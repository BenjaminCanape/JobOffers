import React from "react";
import { BrowserRouter as ReactRouter, Route } from "react-router-dom";

import JobOffersList from "./JobOffer/Pages/JobOffersList";
import AddJobOffer from "./JobOffer/Pages/AddJobOffer";
import EditJobOffer from "./JobOffer/Pages/EditJobOffer";
import ViewJobOffer from "./JobOffer/Pages/ViewJobOffer";

//get the routes
const Routes = () => (
  <ReactRouter>
    <div className="container">
      <Route exact path="/" component={JobOffersList} />
      <Route path="/add" component={AddJobOffer} />
      <Route path="/view/:id" component={ViewJobOffer} />
      <Route path="/edit/:id" component={EditJobOffer} />
    </div>
  </ReactRouter>
);

export default Routes;