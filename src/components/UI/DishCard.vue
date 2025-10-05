<script setup>
defineProps({
  title: {
    type: String,
    default: "Salted Pasta with mushroom sauce",
  },
  price: {
    type: Number,
    default: 2.69,
  },
  available: {
    type: Number,
    default: 11,
  },
  image: {
    type: String,
    default:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80",
  },
});
</script>

<template>
  <div
    class="w-80 bg-gradient-to-b from-slate-800 to-slate-900 rounded-3xl overflow-hidden shadow-2xl"
    @click="handleClick"
  >
    <!-- Image Container -->
    <div class="p-6 pb-4">
      <div class="relative">
        <div
          class="w-full aspect-square rounded-full bg-gradient-to-br from-amber-800 to-amber-900 flex items-center justify-center overflow-hidden shadow-lg"
        >
          <img :src="image" :alt="title" class="w-full h-full object-cover" />
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="px-6 pb-8 text-center">
      <h2
        class="text-white text-xl font-medium mb-4 leading-snug whitespace-pre-line"
      >
        {{ title }}
      </h2>

      <div class="text-white text-2xl font-semibold mb-3">
        $ {{ price.toFixed(2) }}
      </div>

      <div class="text-gray-400 text-sm">
        {{ available }} Bowls available
      </div>
    </div>
  </div>
</template>

