import React, { Component } from "react";
import PropTypes from "prop-types";

//print the flash messages
const FlashMessage = ({ successMessage, errorMessage }) => (
  <div className="FlashMessage">
    {successMessage && (
      <div className="alert alert-success" role="alert">
        {successMessage}{" "}
      </div>
    )}
    {errorMessage && (
      <div className="alert alert-error" role="alert">
        {errorMessage}{" "}
      </div>
    )}
  </div>
);

FlashMessage.propTypes = {
  successMessage: PropTypes.string,
  errorMessage: PropTypes.string,
};

export default FlashMessage;
