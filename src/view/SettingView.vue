<template>
  <div class="p-6 h-screen gap-4">
    <h1 class="text-3xl font-semibold pb-6 text-white">Settings</h1>
    <div class="flex flex-col md:flex-row justify-between gap-6">
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
