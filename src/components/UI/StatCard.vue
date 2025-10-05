
<script setup>
defineProps({
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
    required: true,
  },
});
</script>

<template>
  <div class="bg-[#201D2B] ww-50 h-36f rounded-lg px-4  py-8  text-white w-full">
    <div class="flex items-start justify-between">
      <div class="bg-[#2c2c3d] p-2 rounded-lg">

         <img :src="icon" alt="icon" class="w-8 h-8 object-contain" />
      </div>

      <div class="text-sm text-green-400 flex items-center gap-1">
        <span>{{ percentage }}%</span>
      </div>
    </div>

    <div class="text-2xl font-medium mt-4">{{ amount }}</div>

    <p class="text-base text-gray-500">Total Revenue</p>
  </div>
</template>
