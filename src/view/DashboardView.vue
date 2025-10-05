<script setup>
import StatCard from "@/components/UI/StatCard.vue";
import { order, coin, user, spicy } from "@/assets/images";
import OrderReport from "@/components/UI/OrderReport.vue"
import MostOrdered from "@/components/UI/MostOrdered.vue"
import MostTypeOfOrder from "@/components/UI/MostTypeOfOrder.vue"
</script>

<template>

  <div class="flex flex-col w-full h-full p-8 gap-8 ">
    <div class="text-white">
      <h1 class="font-bold text-2xl">Dashboard</h1>
      <p class="font-light text-base">Tuesday 2 Feb 2021</p>
    </div>
    <div class="gap-6 flex w-full">
      <StatCard :icon="coin" amount="$10,243.00" :percentage="32.4" />
      <StatCard :icon="order" amount="10,243.00" :percentage="32.4" />
      <StatCard :icon="user" amount="10,243.00" :percentage="32.4" />
    </div>

    <!-- Order Report table-->

    <OrderReport />
  </div>


  <div class="w-[600px] gap-8 py-8 pr-8 justify-between flex flex-col">
    <MostOrdered />
    <MostTypeOfOrder />
  </div>


</template>
