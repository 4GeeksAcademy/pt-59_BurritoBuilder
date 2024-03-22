import React, { useState } from 'react';

function PaymentSuccessPopup() {
  return (
   <div style={{height: "840px",width:'1200px', margin: "0px auto", margin: "auto", marginTop: "50px auto", ...customPatternStyle}}>
   <div className="popup-container" style={{  display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginTop: '50px' }}>
      <div style={{ border: '5px double #F70000', borderRadius: '10px', padding: '20px', width: '500px', textAlign: 'center', backgroundColor: '#000', color: '#fff', marginTop: '250px' }}>
        <div className="popup">
          <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>Payment Successful!</h2>
          <p style={{ fontSize: '1.2rem' }}>Thank you for your purchase.</p>
          <button className="btn btn-danger my-3 mx-3"
    onClick={() => window.location.href = '/private'} 
    style={{
        fontSize: '1rem', 
        marginTop: '20px',
        
        color: 'white', // White text
        border: 'none', // No border
        borderRadius: '5px', // Rounded corners
        padding: '10px 20px', // Padding
        cursor: 'pointer' // Cursor style
    }}
>
    Close
</button>

        </div>
      </div>
    </div>
    </div>
  );
   
  
  
  
}
const customPatternStyle = {
  backgroundImage: "repeating-conic-gradient(#F70000 0% 25%, #E4E4ED 0% 50%)",
  backgroundPosition: "0 0, 20px 20px",
  backgroundSize: "64px 64px",
  backgroundColor: "#E4E4ED",
}; 
export default PaymentSuccessPopup;