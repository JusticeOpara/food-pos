<script setup>
import { ref, computed } from "vue";
import ordersData from "../../mock/orders-data.js"

const orders =ref(ordersData)
const filterOpen = ref(false);
const selectedFilter = ref("All");

const filteredOrders = computed(() => {
  if (selectedFilter.value === "All") return orders.value;
  return orders.value.filter((o) => o.status === selectedFilter.value);
});

const getStatusClass = (status) => {
  switch (status) {
    case "Completed":
      return "bg-[#1AAE9F]/20 text-[#1AAE9F]";
    case "Preparing":
      return "bg-[#5A50D2]/20 text-[#5A50D2]";
    case "Pending":
      return "bg-[#9C661F]/20 text-[#9C661F]";
    default:
      return "";
  }
};

const selectFilter = (option) => {
  selectedFilter.value = option;
  filterOpen.value = false;
};
</script>

<template>
  <div
    class="bg-[#201D2B] text-white p-4 sm:p-6 rounded-xl w-full mx-auto relative"
  >
    <!-- Header -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-4 gap-3">
      <h2 class="text-base sm:text-lg font-semibold">Order Report</h2>

      <!-- Filter Button -->
      <div class="relative w-full sm:w-auto">
        <button
          @click="filterOpen = !filterOpen"
          class="flex items-center justify-center gap-2 border border-gray-600 hover:border-gray-400 px-3 py-2 rounded-md text-xs sm:text-sm transition w-full sm:w-auto active:scale-95"
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
          <span class="truncate">
            {{ selectedFilter === "All" ? "Filter Order" : `Filter: ${selectedFilter}` }}
          </span>
        </button>

        <!-- Dropdown -->
        <transition name="fade">
          <div
            v-if="filterOpen"
            class="absolute right-0 mt-2 w-full sm:w-36 bg-[#252539] border border-gray-700 rounded-lg shadow-lg z-10"
          >
            <ul class="text-xs sm:text-sm">
              <li
                v-for="option in ['All', 'Completed', 'Preparing', 'Pending']"
                :key="option"
                @click="selectFilter(option)"
                class="px-4 py-2.5 sm:py-2 cursor-pointer hover:bg-[#2e2e4d] rounded-md active:bg-[#2e2e4d] transition"
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

    <!-- Desktop Table View (Hidden on Mobile) -->
    <div class="hidden md:block">
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
          class="grid grid-cols-4 items-center text-sm py-4 border-b border-gray-800 last:border-0"
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
          <div class="text-gray-300">{{ order.menu }}</div>

          <!-- Total -->
          <div class="text-gray-200 text-right">{{ order.total }}</div>

          <!-- Status -->
          <div class="text-right">
            <span
              class="inline-block px-3 py-1 text-xs font-medium rounded-full"
              :class="getStatusClass(order.status)"
            >
              {{ order.status }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Card View -->
    <div class="md:hidden space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar">
      <div
        v-for="order in filteredOrders"
        :key="order.id"
        class="bg-[#1a1824] rounded-lg p-4 border border-gray-800"
      >
        <!-- Customer Info -->
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-3">
            <img
              :src="order.avatar"
              alt="avatar"
              class="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <div class="font-medium text-sm">{{ order.name }}</div>
              <div class="text-xs text-gray-400">{{ order.menu }}</div>
            </div>
          </div>
          <span
            class="px-2.5 py-1 text-xs font-medium rounded-full whitespace-nowrap"
            :class="getStatusClass(order.status)"
          >
            {{ order.status }}
          </span>
        </div>

        <!-- Order Details -->
        <div class="flex items-center justify-between pt-3 border-t border-gray-800">
          <span class="text-xs text-gray-400">Total Payment</span>
          <span class="text-sm font-medium text-white">{{ order.total }}</span>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-if="filteredOrders.length === 0"
      class="text-center py-12 text-gray-400"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-12 h-12 mx-auto mb-3 opacity-50"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776"
        />
      </svg>
      <p class="text-sm">No orders found</p>
    </div>
  </div>
</template>

<style scoped>
/* Custom Scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #1a1824;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #393C49;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #4a4d5a;
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

/* Prevent tap highlight */
button,
li {
  -webkit-tap-highlight-color: transparent;
  -webkit-user-select: none;
  user-select: none;
}
</style>