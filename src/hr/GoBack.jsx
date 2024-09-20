import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/goback.css'; // Import the CSS file for styling

const GoBackLink = ({ text = "Go Back" }) => {
  const navigate = useNavigate();

  const handleGoBack = (event) => {
    event.preventDefault(); // Prevent the default action of the button
    navigate(-1); // Navigate to the previous page
  };

  return (
    <button onClick={handleGoBack} className="go-back-link">
       <i className="fas fa-arrow-left" style={{ marginRight: '5px' }}></i>
      {text}
    </button>
  );
};

export default GoBackLink;
