import { defineStore } from 'pinia';

const useFoodStore = defineStore('food', {
    state: () => ({
        foodItems: [],
    }),
    actions: {
        getFoodItems(foods) {
            this.foodItems = foods;
        },
        addFood(foodItem) {
            this.foodItems.push(foodItem);
        },
        updateFood(updatedFood) {
            const index = this.foodItems.findIndex((food) => food.id === updatedFood.id);
            this.foodItems[index] = updatedFood;
        },
        removeFood(id) {
            this.foodItems = this.foodItems.filter((food) => food.id !== id);
        },
    },
});

export default useFoodStore;