<template>
  <div class="p-6 h-screen">
    <h1 class="text-3xl font-semibold mb-8 text-white">Settings</h1>
    <div class="flex justify-between gap-6 h-full">
      <SettingsOptions />

      <ProductsManagementVue />
    </div>
  </div>
</template>

<script>
import ProductsManagementVue from "@/components/UI/ProductsManagement.vue";
import SettingsOptions from "@/components/UI/SettingsOptions.vue";
export default {
  components: {
    SettingsOptions,
    ProductsManagementVue,
  },
};
</script>

<style scoped></style>
