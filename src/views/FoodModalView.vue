<script setup>
    const addFood = () => {
      // Implement your add logic here
      console.log("Add button clicked");
};


</script>

<template>
    <div
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      @click.self="$emit('close')"
    >
      <div
        class="w-full max-w-lg rounded-2xl border border-blue-100 bg-white p-4 shadow-lg sm:p-6 lg:p-8"
        role="alert"
      >
        <!-- Modal Header -->
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold">Add New Food Item</h2>
          <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
  
        <!-- Input Fields -->
        <div class="space-y-4">
          <div>
            <label for="food-name" class="block text-sm font-medium text-gray-700">
              Name of Food
            </label>
            <input
              id="food-name"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Enter food name"
            />
          </div>
          <div>
            <label for="category" class="block text-sm font-medium text-gray-700">
              Category of Food
            </label>
            <input
              id="category"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Enter category"
            />
          </div>
          <div>
            <label for="manufacture-date" class="block text-sm font-medium text-gray-700">
              Manufacture Date
            </label>
            <input
              id="manufacture-date"
              type="date"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label for="expiration-date" class="block text-sm font-medium text-gray-700">
              Expiration Date
            </label>
            <input
              id="expiration-date"
              type="date"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>
  
        <!-- Action Buttons -->
        <div class="mt-6 flex justify-end space-x-4">
          <button
            class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            @click="$emit('close')"
          >
            Cancel
          </button>
          <button
            class="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
            @click="addFood"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  </template>
  

  