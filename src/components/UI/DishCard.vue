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

const handleClick = () => {
  // Add your click handler logic
};
</script>

<template>
  <div
    class="food-card w-80 bg-[#201D2B] rounded-3xl overflow-hidden shadow-2xl cursor-pointer"
    @click="handleClick"
  >
    <!-- Image Container -->
    <div class="p-6 pb-4">
      <div class="relative">
        <div
          class="image-container w-full aspect-square rounded-full bg-gradient-to-br from-amber-800 to-amber-900 flex items-center justify-center overflow-hidden shadow-lg"
        >
          <img :src="image" :alt="title" class="food-image w-full h-full object-cover" />
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

      <div class="price-tag text-white text-2xl font-semibold mb-3">
        $ {{ price.toFixed(2) }}
      </div>

      <div class="text-gray-400 text-sm">
        {{ available }} Bowls available
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Card base animation */
.food-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

/* Hover effects */
.food-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px -12px rgba(234, 124, 105, 0.25);
}

.food-card:active {
  transform: translateY(-4px);
}

/* Image animation */
.image-container {
  transition: transform 0.3s ease;
}

.food-card:hover .image-container {
  transform: scale(1.05);
}

.food-image {
  transition: transform 0.5s ease;
}

.food-card:hover .food-image {
  transform: scale(1.1);
}
</style>