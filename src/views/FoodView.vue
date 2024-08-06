<script setup>
import { ref, onMounted, watch } from 'vue';

import FoodModalView from './FoodModalView.vue'; 
import axios from '../api/axios'

const showModal = ref(false);
const foodList = ref([]);

const validateFoodData = (foodData) => {
  const errors = [];
  if (!foodData.foodName) errors.push('Food name is required.');
  if (!foodData.category) errors.push('Category is required.');
  if (!foodData.manufactureDate) errors.push('Manufacture date is required.');
  if (!foodData.expirationDate) errors.push('Expiration date is required.');
  return errors;
};

const handleAddFood = async (foodData) => {
  const errors = validateFoodData(foodData);
  if (errors.length > 0) {
    console.log('Validation errors:', errors);
    return;
  }

  try {
    const response = await axios.post('http://localhost:3000/api/v1/food-add', {
      name: foodData.foodName,
      category: foodData.category,
      manufacture_date: foodData.manufactureDate,
      expiration_date: foodData.expirationDate,
    })

    if (response.data.error) {
      console.log(response.data.error)
      return
    } 
    
    console.log('Food added:', response.data);
    closeModal();
  } catch (error) {
    console.error(error)
  }
}

const handleGetFoods = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/v1/foods')

    const mapFood = response.data.result.map((food) => {
      return {
        foodName: food.name,
        category: food.category,
        manufactureDate: food.manufacture_date,
        expirationDate: food.expiration_date,
      };
    });
    console.log("Mapped Foods: ", mapFood);
    foodList.value = mapFood;
  } catch (error) {
    console.error(error)
  }
}

const addItem = () => {
  console.log("Add item");
  showModal.value = true; // Show the modal
};

const editItem = () => {
  console.log("Edit item");
  // Add your logic to edit the item
};

const deleteItem = () => {
  console.log("Delete item");
  // Add your logic to delete the item
};

const closeModal = () => {
  showModal.value = false; // Close the modal
};

onMounted(() => {
  handleGetFoods();
});

watch(showModal, (value) => {
  if (!value) {
    handleGetFoods();
  }
});

</script>

<template>
  <div class="max-w-lg mx-auto p-4">
    <!-- Add Item Button and Modal -->
    <button @click="addItem" class="mb-4 bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">
      Add Item
    </button>
    <FoodModalView v-if="showModal" @close="closeModal" @addFood="handleAddFood" />

    <!-- Food List -->
    <div  v-for="(food, index) in foodList" :key="index" class="rounded-xl bg-white p-6 ring ring-indigo-50 shadow-lg mb-4">
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
            {{ food.foodName }}
          </h3>

          <p class="mt-2 text-sm text-gray-700">
            Manufacture Date: {{ food.manufacture_date }} <br>
            Expiration Date: {{ food.expiration_date }}
          </p>

          <!-- Edit/Delete Buttons -->
          <div class="mt-4 flex gap-2">
            <button @click="editItem(food)" class="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Edit</button>
            <button @click="deleteItem(food)" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

