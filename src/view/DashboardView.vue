<script setup>
import StatCard from "@/components";
import Order from "@/assets/images/order.png";
import User from "@/assets/images/user.png";
import Coin from "@/assets/images/coin.png";
import spicy from "@/assets/images/spicy.png"
</script>

<template>
  <div class="flex flex-col w-full h-full p-8">
    <div>
      <h1 class="font-bold text-2xl">Dashboard</h1>
      <p class="font-light text-base">Tuesday 2 Feb 2021</p>
    </div>
    <div class="gap-6 flex w-full">
      <StatCard :icon="Coin" amount="$10,243.00" :percentage="32.4" />
      <StatCard :icon="Order" amount="10,243.00" :percentage="32.4" />
      <StatCard :icon="User" amount="10,243.00" :percentage="32.4" />
    </div>

    <!-- Order Report table-->
  </div>
  <div class="w-[372px] h-screen bg-red-300">
    <h1 class="font-medium">Most Ordered</h1>

    <div>Today</div>
     <img :src="spicy" class="w-8  h-8" alt="spicy" />
  <div>
    <h1>Spicy seasoned seafood noodles</h1>
    <span class="font-light ">200 dishes ordered</span>
  </div>
  </div>
 
</template>
