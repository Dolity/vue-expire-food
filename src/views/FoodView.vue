<script setup>
import { ref } from 'vue';
import FoodModalView from './FoodModalView.vue'; // Import the modal component

const showModal = ref(false);

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
</script>

<template>
  <div class="max-w-lg mx-auto p-4">
    <div class="relative mb-6">
      <label for="Search" class="sr-only">Search</label>
      <input
        type="text"
        id="Search"
        placeholder="Search for..."
        class="w-full rounded-md border border-gray-200 py-2.5 pr-10 shadow-sm sm:text-sm focus:border-indigo-500 focus:ring-indigo-500"
      />
      <span class="absolute inset-y-0 right-0 flex items-center pr-3">
        <button type="button" class="text-gray-600 hover:text-gray-700 focus:outline-none">
          <span class="sr-only">Search</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-5 w-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 7.5 0 105.196 5.196a7.5 7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </span>
    </div>

    <button
      @click="addItem"
      class="mb-4 bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
    >
      Add Item
    </button>

    <!-- Modal -->
    <FoodModalView v-if="showModal" @close="closeModal" />

    <article class="rounded-xl bg-white p-6 ring ring-indigo-50 shadow-lg">
      <div class="flex items-start gap-6">
        <div
  class="hidden sm:flex sm:flex-col sm:items-center sm:justify-center sm:h-20 sm:w-20 sm:rounded-full sm:border-2 sm:border-indigo-500"
  aria-hidden="true"
>
  <div class="flex flex-col items-center gap-1">
    <!-- Food Icon SVG -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      class="w-12 h-12 text-indigo-500"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M7 3h10M7 7h10M7 11h3m4 0h3M5 15h14m-7 4h2m-7-6h.01m0 0H7m0 0h.01m-2.01 0h.01m0 0H7m0 0h.01M5 15h.01m14-.01h.01m-1.42-1.42a2 2 0 10-2.83 0m-5.66 0a2 2 0 10-2.83 0"
      />
    </svg>
  </div>
</div>

        <div>
          <strong class="rounded bg-indigo-500 px-3 py-1.5 text-xs font-medium text-white">
            Episode #101
          </strong>

          <h3 class="mt-4 text-lg font-semibold text-gray-900 sm:text-xl">
            <a href="#" class="hover:underline">Some Interesting Podcast Title</a>
          </h3>

          <p class="mt-2 text-sm text-gray-700">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam nulla amet voluptatum sit
            rerum, atque, quo culpa ut necessitatibus eius suscipit eum accusamus, aperiam voluptas
            exercitationem facere aliquid fuga. Sint.
          </p>

          <div class="mt-4 flex flex-col sm:flex-row sm:items-center sm:gap-2">
            <div class="flex items-center gap-1 text-gray-500">
              <svg
                class="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>

              <p class="text-xs font-medium">48:32 minutes</p>
            </div>

            <span class="hidden sm:block" aria-hidden="true">&middot;</span>

            <p class="mt-2 text-xs font-medium text-gray-500 sm:mt-0">
              Featuring <a href="#" class="underline hover:text-gray-700">Barry</a>,
              <a href="#" class="underline hover:text-gray-700">Sandra</a> and
              <a href="#" class="underline hover:text-gray-700">August</a>
            </p>
          </div>

          <!-- Add/Edit/Delete Buttons -->
          <div class="mt-4 flex gap-2">
            <button
              @click="editItem"
              class="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
              @click="deleteItem"
              class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>
