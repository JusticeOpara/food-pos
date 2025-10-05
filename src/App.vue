<script setup>
import { RouterView } from "vue-router";
import Sidebar from "@/components/UI/Sidebar.vue";
</script>

<template>
  <div class="flex flex-row bg-[#252836]">
    <Sidebar
      :collapsed="sidebarCollapsed"
      @collapse-change="handleCollapseChange"
      @item-click="handleItemClick"
      defaultActiveItem="home"
    />
    <RouterView />
  </div>
</template>
