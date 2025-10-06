<script setup>
import order from "@/mock/orders-data.js";

import { ref, computed } from "vue";

const orders = ref(order)
const filterOpen = ref(false);
const selectedFilter = ref("All");

const filteredOrders = computed(() => {
  if (selectedFilter.value === "All") return orders.value;
  return orders.value.filter((o) => o.status === selectedFilter.value);
});

const getStatusClass = (status) => {
  switch (status) {
    case "Completed":
      return "bg-[#1AAE9F]/20 text-[#1AAE9F] ";
    case "Preparing":
      return "bg-[#5A50D2]/20 text-[#5A50D2]";
    case "Pending":
      return "bg-[#9C661F]/20 text-[#9C661F]";
    default:
      return "";
  }
};
</script>


<template>
  <div
    class="bg-[#201D2B] text-white p-6 rounded-xl w-full  mx-auto relative"
  >
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-semibold">Order Report</h2>

      <!-- Filter Button -->
      <div class="relative">
        <button
          @click="filterOpen = !filterOpen"
          class="flex items-center gap-2 border border-gray-600 hover:border-gray-400 px-3 py-2 rounded-md text-sm transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-4 h-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 4.5h18m-6 15H9m9-7.5H6"
            />
          </svg>
          {{ selectedFilter === "All" ? "Filter Order" : `Filter: ${selectedFilter}` }}
        </button>

        <!-- Dropdown -->
        <transition name="fade">
          <div
            v-if="filterOpen"
            class="absolute right-0 mt-2 w-36 bg-[#252539] border border-gray-700 rounded-lg shadow-lg z-10"
          >
            <ul class="text-sm">
              <li
                v-for="option in ['All', 'Completed', 'Preparing', 'Pending']"
                :key="option"
                @click="
                  selectedFilter = option;
                  filterOpen = false;
                "
                class="px-4 py-2 cursor-pointer hover:bg-[#2e2e4d] rounded-md"
                :class="{
                  'text-[#1AAE9F]': selectedFilter === option && option === 'Completed',
                  'text-[#5A50D2]': selectedFilter === option && option === 'Preparing',
                  'text-[#9C661F]': selectedFilter === option && option === 'Pending',
                  'text-gray-300': selectedFilter !== option,
                }"
              >
                {{ option }}
              </li>
            </ul>
          </div>
        </transition>
      </div>
    </div>

    <!-- Table Header -->
    <div
      class="grid grid-cols-4 text-sm font-medium text-gray-400 border-b border-gray-700 pb-2 mb-2"
    >
      <span>Customer</span>
      <span>Menu</span>
      <span class="text-right">Total Payment</span>
      <span class="text-right">Status</span>
    </div>

    <!-- Scrollable Table Rows -->
    <div class="max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
      <div
        v-for="order in filteredOrders"
        :key="order.id"
        class="grid grid-cols-4 items-center text-sm py-8 "
      >
        <!-- Customer -->
        <div class="flex items-center gap-3">
          <img
            :src="order.avatar"
            alt="avatar"
            class="w-8 h-8 rounded-full object-cover"
          />
          <span>{{ order.name }}</span>
        </div>

        <!-- Menu -->
        <div class="text-gray-300 ">{{ order.menu }}</div>

        <!-- Total -->
        <div class="text-gray-200 text-right">{{ order.total }}</div>

        <!-- Status -->
        <div class="text-right">
          <span
            class="px-3 py-1 text-xs font-medium rounded-full text-left"
            :class="getStatusClass(order.status)"
          >
            {{ order.status }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>



<style scoped>
body {
  background-color: #141424;
}

/* Smooth fade for dropdown */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
