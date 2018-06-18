import React from 'react';
import PropTypes from 'prop-types';
import ReactFlashMessage from 'react-flash-message';

//print the flash messages
const FlashMessage = ({ successMessage, errorMessage }) => (
  <ReactFlashMessage duration={15000}>
    {successMessage && (
      <div className="alert alert-success" role="alert">
        {successMessage}
      </div>
    )}
    {errorMessage && (
      <div className="alert alert-danger" role="alert">
        {errorMessage}
      </div>
    )}
  </ReactFlashMessage>
);

FlashMessage.propTypes = {
  successMessage: PropTypes.string,
  errorMessage: PropTypes.string,
};

export default FlashMessage;
