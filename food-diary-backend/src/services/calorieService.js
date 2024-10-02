const foodDatabase = [
  { id: 1, name: 'Apple', calories: 95 },
  { id: 2, name: 'Banana', calories: 105 },
  { id: 3, name: 'Orange', calories: 62 },
  // Add more predefined food items
];

export const getCaloriesForFood = (name) => {
  const food = foodDatabase.find(
    item => item.name.toLowerCase() === name.toLowerCase()
  );
  return food ? food.calories : null;
};

export const addFoodToDatabase = (foodItem) => {
  foodDatabase.push(foodItem);
};
