
<script setup>
export const StatCard = {
  props: {
    amount: {
      type: String,
      required: true,
    },
    percentage: {
      type: Number,
      default: 0,
    },
    icon: {
      type: String,
    },
  },
};
</script>

<template>
  <div class="bg-[#1e1e2f] ww-50 h-36 rounded-lg p-4 text-white w-full">
    <div class="flex items-start justify-between">
      <div class="bg-[#2c2c3d] p-2 rounded-lg">
        <img :src="icon" class="" alt="icon" />
      </div>

      <div class="text-sm text-green-400 flex items-center gap-1">
        <span>{{ percentage }}%</span>
      </div>
    </div>

    <div class="text-2xl font-medium mt-4">{{ amount }}</div>

    <p class="text-base text-gray-500">Total Revenue</p>
  </div>
</template>
