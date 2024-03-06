import React from 'react';

const Buildertools = ({ handleAddNewBruger, handleClearIngredients }) => {
  return (
    <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginLeft: '0px', 
        position:'relative',
        


        }}>

      <div style={{ 
        width: '125px', 
        height: '35px', 
        backgroundColor: '#3b85fb', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        clipPath: 'polygon(0% 0%, 100% 0%, 85% 100%, 15% 100%)', 
        borderRadius: '0 0 25px 25px',
         }}>
        <img
          src="https://img.icons8.com/material-outlined/24/FFFFFF/plus--v1.png"
          alt="Add"
          style={{ width: '24px', height: '24px', marginRight: '10px', cursor: 'pointer' }}
          onClick={handleAddNewBruger}
        />
        <img
          src="https://img.icons8.com/material-outlined/24/FFFFFF/trash--v1.png"
          alt="Delete"
          onClick={handleClearIngredients}
          style={{ width: '24px', height: '24px', cursor: 'pointer' }}
        />
      </div>
    </div>
  );
};

export default Buildertools;
