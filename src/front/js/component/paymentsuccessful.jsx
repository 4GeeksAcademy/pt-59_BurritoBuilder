import React, { useState } from 'react';

function PaymentSuccessPopup() {
  return (
    <div className="popup-container">
      <div className="popup">
        <h2>Payment Successful!</h2>
        <p>Thank you for your purchase.</p>
        <button onClick={() => window.location.href = '/private'}>Close</button>
      </div>
    </div>
  );
}

export default PaymentSuccessPopup;