
<script setup>
import DishCard from '@/components/UI/DishCard.vue'
</script>

<template>
  <section class="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-8 p-8">



   <h2>Choose Dishes</h2>
    <div class="flex flex-wrap justify-center gap-6">
      <DishCard 
        title="Spicy Ramen Noodles" 
        :price="4.99" 
        :available="7"
        image="https://images.unsplash.com/photo-1601050690597-1c750a12c95d?w=800&q=80"
      />
      <DishCard 
        title="Grilled Chicken with Veggies" 
        :price="6.49" 
        :available="5"
        image="https://images.unsplash.com/photo-1613145993481-9b01d0da7b8a?w=800&q=80"
      />
      <DishCard 
        title="Classic Burger & Fries" 
        :price="5.29" 
        :available="3"
        image="https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80"
      />
    </div>
  </section>
</template>
