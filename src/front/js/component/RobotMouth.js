import React from 'react';

const RobotMouth = () => {
  return (
    <div style={{
      position: 'relative',  // Ensure the parent div has a relative position
      width: '100%',  // Set width to fill the parent div
      height: '0px',  // Adjust height of the parent div as needed
      backgroundColor: 'lightgray',  // Example background color for the parent div
    }}>
      {/* Child square */}
      <div style={{
        width: '265px',
        height: '55px',
        backgroundColor: '#3b85fb',
        position: 'absolute',  // Use absolute positioning for the square
        bottom: '0',  // Align the square at the bottom of the parent div
        left: '50%',  // Center the square horizontally within the parent div
        transform: 'translateX(-50%)',  // Center the square horizontally within the parent div
        borderRadius: '10px 10px 0 0',  // Apply border radius only to top corners
        zIndex: '20',  // Higher zIndex value to ensure it sits above other content
      }}>
        {/* Four little purple squares */}
        <div style={{
          position: 'absolute',
          width: '41px',
          height: '30px',
          backgroundColor: '#3b85fb',
          top: '-20px',  // Place the purple square at the top of the blue square
          left: '10px',
          borderRadius: '10px 10px 0 0',  // Adjust left position as needed
        }}></div>
        <div style={{
          position: 'absolute',
          width: '41px',
          height: '30px',
          backgroundColor: '#3b85fb',
          top: '-20px',  // Place the purple square at the top of the blue square
          left: '35%',  // Center the square horizontally within the blue square
          transform: 'translateX(-50%)',
          borderRadius: '10px 10px 0 0',  // Center the square horizontally within the blue square
        }}></div>
        <div style={{
          position: 'absolute',
          width: '41px',
          height: '30px',
          backgroundColor: '#3b85fb',
          top: '-20px',  // Place the purple square at the top of the blue square
          right: '30%',
          borderRadius: '10px 10px 0 0',  // Adjust right position as needed
        }}></div>
        <div style={{
          position: 'absolute',
          width: '41px',
          height: '30px',
          backgroundColor: '#3b85fb',
          top: '-20px',  // Place the purple square at the top of the blue square
          right: '10px',
          borderRadius: '10px 10px 0 0',  // Adjust right position as needed
        }}></div>
      </div>
    </div>
  );
}

export default RobotMouth;


