import React from 'react';

const IngredientComponent = ({ ingredient, onIngredientClick }) => {
  const handleClick = () => {
    // Call the onIngredientClick callback with the ingredient ID
    onIngredientClick(ingredient.id);
  };

  return (
    <div onClick={handleClick} style={{ textAlign: 'center',}}>
        {/* Render your ingredient */}
        <img src={ingredient.image} alt={ingredient.image} style={{  width: '100px', height: '100px' , left: '0px'}} />
        <p style={{ margin: '0', fontSize: '16px' }}>{ingredient.name}</p>
        <p style={{ margin: '0', fontSize: '16px' }}>${ingredient.price}</p>
    </div>
);
};

export default IngredientComponent;
