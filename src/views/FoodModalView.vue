<script setup>
import { ref, watch } from 'vue';
import moment from 'moment';

const props = defineProps({
  isEdit: Boolean,
  food: Object,
});

const emit = defineEmits(['close', 'addOrUpdateFood']);

const name = ref('');
const category = ref('');
const manufacture_date = ref('');
const expiration_date = ref('');

// คัดลอกข้อมูลจาก props.food ไปยัง ref เมื่อ props.food เปลี่ยนแปลง
watch(
  () => props.food,
  (newFood) => {
    if (newFood) {
      name.value = newFood.name || '';
      category.value = newFood.category || '';
      manufacture_date.value = newFood.manufacture_date ? moment(newFood.manufacture_date).format('YYYY-MM-DD') : '';
      expiration_date.value = newFood.expiration_date ? moment(newFood.expiration_date).format('YYYY-MM-DD') : '';
    } else {
      name.value = '';
      category.value = '';
      manufacture_date.value = '';
      expiration_date.value = '';
    }
  },
  { immediate: true }
);

const callBackFood = () => {
  console.log('Manufacture Date:', manufacture_date.value);
  console.log('Expiration Date:', expiration_date.value);

  emit('addOrUpdateFood', {
    id: props.food?.id,
    name: name.value,
    category: category.value,
    manufacture_date: manufacture_date.value,
    expiration_date: expiration_date.value,
  });
};
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" @click.self="$emit('close')">
    <div class="w-full max-w-lg rounded-2xl border border-blue-100 bg-white p-4 shadow-lg sm:p-6 lg:p-8" role="alert">
      <!-- Modal Header -->
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-semibold">{{ isEdit ? 'Edit Food Item' : 'Add New Food Item' }}</h2>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">
          &times;
        </button>
      </div>

      <!-- Input Fields -->
      <div class="space-y-4">
        <div>
          <label for="food-name" class="block text-sm font-medium text-gray-700">Name of Food</label>
          <input
            id="food-name"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Enter food name"
            v-model="name"
          />
        </div>
        <div>
          <label for="category" class="block text-sm font-medium text-gray-700">Category of Food</label>
          <input
            id="category"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Enter category"
            v-model="category"
          />
        </div>
        <div>
          <label for="manufacture-date" class="block text-sm font-medium text-gray-700">Manufacture Date</label>
          <input
            id="manufacture-date"
            type="date"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            v-model="manufacture_date"
          />
        </div>
        <div>
          <label for="expiration-date" class="block text-sm font-medium text-gray-700">Expiration Date</label>
          <input
            id="expiration-date"
            type="date"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            v-model="expiration_date"
          />
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="mt-6 flex justify-end space-x-4">
        <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" @click="$emit('close')">
          Cancel
        </button>
        <button class="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600" @click="callBackFood">
          {{ isEdit ? 'Update' : 'Add' }}
        </button>
      </div>
    </div>
  </div>
</template>
