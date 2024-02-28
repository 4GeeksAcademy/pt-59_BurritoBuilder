import React from 'react';

const IngredientComponent = ({ ingredient, onIngredientClick }) => {
  const handleClick = () => {
    // Call the onIngredientClick callback with the ingredient ID
    onIngredientClick(ingredient.id);
  };

  return (
    <div onClick={handleClick}>
      {/* Render your ingredient */}
      <img src={ingredient.image} alt={ingredient.name} />
      <p>{ingredient.name}</p>
    </div>
  );
};

export default IngredientComponent;
