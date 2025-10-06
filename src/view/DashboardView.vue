<script setup>
import StatCard from "@/components/UI/StatCard.vue";
import { order, coin, user, spicy } from "@/assets/images";
import OrderReport from "@/components/UI/OrderReport.vue"
import MostOrdered from "@/components/UI/MostOrdered.vue"
import MostTypeOfOrder from "@/components/UI/MostTypeOfOrder.vue"
</script>

<template>
<div class="flex flex-col h-full w-full md:flex-row items-center justify-center p-4 space-y-8 md:space-y-0">
 <div class="flex flex-col w-full h-full md:p-8 gap-8 "> 
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


  <div class="md:w-[600px] w-full gap-8 md:py-8 md:pr-8 justify-between flex flex-col">
    <MostOrdered />
    <MostTypeOfOrder />
  </div>
</div>
 


</template>
