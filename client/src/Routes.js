import React from 'react';
import { BrowserRouter as ReactRouter, Route } from 'react-router-dom';

import LoginPage from './Authentification/components/Login';
import RegisterPage from './Authentification/components/Register';

import JobOffersList from './JobOffer/Pages/JobOffersList';
import AddJobOffer from './JobOffer/Pages/AddJobOffer';
import EditJobOffer from './JobOffer/Pages/EditJobOffer';
import ViewJobOffer from './JobOffer/Pages/ViewJobOffer';
import RecuiterOffers from './JobOffer/Pages/RecuiterOffers';
import EditProfile from './Authentification/components/EditProfile';
import EditPassword from './Authentification/components/EditPassword';

//get the routes
const Routes = () => (
  <ReactRouter>
    <div className="container">
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/myprofile" component={EditProfile} />
      <Route path="/editPassword" component={EditPassword} />
      <Route exact path="/" component={JobOffersList} />
      <Route path="/myOffers" component={RecuiterOffers} />
      <Route path="/add" component={AddJobOffer} />
      <Route path="/view/:id" component={ViewJobOffer} />
      <Route path="/edit/:id" component={EditJobOffer} />
    </div>
  </ReactRouter>
);

export default Routes;
