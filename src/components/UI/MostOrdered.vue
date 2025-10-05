<script setup>
import { ref, computed } from "vue";
import MostOrdered from "@/mock/most-ordered-data.js"

const selectedFilter = ref("Today");
const showAll = ref(false);

const mostOrdered = ref(MostOrdered);

const filters = ["Today", "Yesterday", "Last Week"];

const filteredDishes = computed(() => {
  const key = selectedFilter.value.toLowerCase().replace(" ", "");
  return mostOrdered.value.filter((dish) => dish.date === key);
});

const displayedDishes = computed(() => {
  return showAll.value ? filteredDishes.value : filteredDishes.value.slice(0, 3);
});

const toggleShowAll = () => {
  showAll.value = !showAll.value;
};
</script>

<template>
  <div class="bg-[#201D2B] text-white p-6 w-full rounded-lg h-full shadow-md">
    <!-- Header -->
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-semibold">Most Ordered</h2>
      <div class="relative">
        <select
          v-model="selectedFilter"
          class="bg-transparent border border-gray-600 text-sm px-3 py-1 rounded-md appearance-none focus:outline-none cursor-pointer pr-6"
        >
          <option
            v-for="filter in filters"
            :key="filter"
            :value="filter"
            class="bg-[#1e1e2f]"
          >
            {{ filter }}
          </option>
        </select>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 absolute right-2 top-2.5 pointer-events-none text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>

    <hr class="border-gray-700 mb-4" />

    <!-- Dishes list -->
    <div class="space-y-5 max-h-[250px] overflow-y-auto custom-scroll">
      <div
        v-for="dish in displayedDishes"
        :key="dish.id"
        class="flex items-center gap-4"
      >
        <img
          :src="dish.image"
          alt="dish"
          class="w-12 h-12 rounded-full object-cover border border-gray-600"
        />
        <div>
          <p class="text-sm font-medium">{{ dish.name }}</p>
          <p class="text-xs text-gray-400">{{ dish.orders }} dishes ordered</p>
        </div>
      </div>
    </div>

    <!-- View All / Less -->
    <div class="mt-6">
      <button
        v-if="filteredDishes.length > 0"
        @click="toggleShowAll"
        class="w-full py-2 border border-[#ff8b5f] text-[#ff8b5f] rounded-lg hover:bg-[#ff8b5f] hover:text-white transition"
      >
        {{ showAll ? "View Less" : "View All" }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.custom-scroll::-webkit-scrollbar {
  width: 4px;
}
.custom-scroll::-webkit-scrollbar-thumb {
  background-color: #3a3a4d;
  border-radius: 10px;
}
</style>
