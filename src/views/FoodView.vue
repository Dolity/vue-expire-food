<script setup>
import { ref, onMounted } from 'vue';
import FoodModalView from './FoodModalView.vue'; 
import useFoodStore  from '../stores/foodStore.js';
import axios from '../api/axios';

const showModal = ref(false);
const isEditMode = ref(false);
const currentFood = ref(null);

const foodStore = useFoodStore();

const openAddModal = () => {
  currentFood.value = null; // Reset currentFood for adding new item
  isEditMode.value = false;
  showModal.value = true;
};

const openEditModal = (food) => {
  currentFood.value = { ...food }; // Clone food to avoid direct mutations
  isEditMode.value = true;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const handleAddOrUpdateFood = async (foodData) => {
  try {
    if (isEditMode.value) {
      // Update food
      await axios.put(`http://localhost:3000/api/v1/food-update/${foodData.id}`, foodData);
      await foodStore.updateFood(foodData);
      foodStore.updateFood(foodData);
      console.log('Food updated:', foodData);
    } else {
      // Add new food
      const response = await axios.post('http://localhost:3000/api/v1/food-add', foodData);
      await foodStore.addFood(response.data.result);
      console.log('Food added:', response.data);
    }
    closeModal();
  } catch (error) {
    console.error(error);
  }
};

const handleDeleteFood = async (food) => {
  try {
    await axios.delete(`http://localhost:3000/api/v1/food-delete/${food.id}`);
    foodStore.removeFood(food.id);
    console.log('Food deleted:', food);
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  // Fetch foods on mount
  (async () => {
    const response = await axios.get('http://localhost:3000/api/v1/foods');
    foodStore.getFoodItems(response.data.result);
  })();
});
</script>

<template>
  <div class="max-w-lg mx-auto p-4">
    <!-- Add Item Button and Modal -->
    <button @click="openAddModal" class="mb-4 bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">
      Add Item
    </button>
    <FoodModalView
      v-if="showModal"
      :isEdit="isEditMode"
      :food="currentFood"
      @close="closeModal"
      @addOrUpdateFood="handleAddOrUpdateFood"
    />

    <!-- Food List -->
    <div v-for="food in foodStore.foodItems" :key="food.id" class="rounded-xl bg-white p-6 ring ring-indigo-50 shadow-lg mb-4">
      <div class="flex items-start gap-6">
        <div class="hidden sm:flex sm:flex-col sm:items-center sm:justify-center sm:h-20 sm:w-20 sm:rounded-full sm:border-2 sm:border-indigo-500" aria-hidden="true">
          <div class="flex flex-col items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-12 h-12 text-indigo-500">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 3h10M7 7h10M7 11h3m4 0h3M5 15h14m-7 4h2m-7-6h.01m0 0H7m0 0h.01m-2.01 0h.01m0 0H7m0 0h.01M5 15h.01m14-.01h.01m-1.42-1.42a2 2 0 10-2.83 0m-5.66 0a2 2 0 10-2.83 0" />
            </svg>
          </div>
        </div>

        <div>
          <strong class="rounded bg-indigo-500 px-3 py-1.5 text-xs font-medium text-white">
            {{ food.category }}
          </strong>

          <h3 class="mt-4 text-lg font-semibold text-gray-900 sm:text-xl">
            {{ food.name }}
          </h3>

          <p class="mt-2 text-sm text-gray-700">
            Manufacture Date: {{ food.manufacture_date }} <br>
            Expiration Date: {{ food.expiration_date }}
          </p>

          <!-- Edit/Delete Buttons -->
          <div class="mt-4 flex gap-2">
            <button @click="openEditModal(food)" class="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Edit</button>
            <button @click="handleDeleteFood(food)" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
