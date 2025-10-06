<template>
  <div class="flex min-h-screen bg-[#252836]">
    <!-- Sidebar Navigation -->
  <sidebar/>

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import Sidebar from "@/components/UI/Sidebar.vue";
</script>



