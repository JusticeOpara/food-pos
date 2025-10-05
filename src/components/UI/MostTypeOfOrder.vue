<template>
  <!-- Most Type of Order Chart -->
  <div class="bg-[#201D2B] rounded-lg p-4 shadow-md h-full">
    <div class="flex items-center justify-between ">
      <h2 class="text-white text-xl font-semibold">Most Type of Order</h2>
      <button
        class="flex items-center gap-2 bg-[#252836] text-white px-4 py-2 rounded-lg border border-gray-700"
      >
        <span class="text-sm">Today</span>
      </button>
    </div>

    <div class="flex items-center h-full">
      <div class=" w-60 h-60">
        <apexchart
          type="donut"
          :options="chartOptions"
          :series="series"
          height="256"
        />
      </div>

      <div class="flex-1 space-y-6">
        <div
          v-for="item in chartData"
          :key="item.label"
          class="flex items-center gap-4"
        >
          <div
            class="w-4 h-4 rounded-full"
            :style="{ backgroundColor: item.color }"
          ></div>
          <div class="flex-1">
            <p class="text-white text-base font-medium mb-1">
              {{ item.label }}
            </p>
            <p class="text-gray-400 text-sm">{{ item.customers }} customers</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const chartData = ref([
  { label: "Dine In", customers: 200, color: "#FF6B9D" },
  { label: "To Go", customers: 122, color: "#FFB572" },
  { label: "Delivery", customers: 264, color: "#4A9EFF" },
]);

const series = ref([200, 122, 264]);

const chartOptions = ref({
  chart: {
    type: "donut",
    background: "transparent",
  },
  colors: ["#FF6B9D", "#FFB572", "#4A9EFF"],
  labels: ["Dine In", "To Go", "Delivery"],
  dataLabels: {
    enabled: false,
  },
  legend: {
    show: false,
  },
  plotOptions: {
    pie: {
      donut: {
        size: "75%",
        background: "transparent",
      },
    },
  },
  stroke: {
    show: true,
    width: 6,
    colors: ["#1F1D2B"],
  },
});
</script>
