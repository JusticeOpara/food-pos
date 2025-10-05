<template>
  <div class="bg-[#1F1D2B] rounded-lg p-6 h-full flex flex-col">
    <!-- Header -->
    <div class="mb-6">
      <h2 class="text-white text-xl font-bold mb-2">Orders #{{ orderNumber }}</h2>
      
      <!-- Order Type Buttons -->
      <div class="flex gap-2">
        <button
          v-for="type in orderTypes"
          :key="type"
          @click="selectedOrderType = type"
          :class="[
            'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
            selectedOrderType === type
              ? 'bg-[#EA7C69] text-white'
              : 'bg-[#252836] text-gray-400 hover:text-white'
          ]"
        >
          {{ type }}
        </button>
      </div>
    </div>

    <!-- Order Items Header -->
    <div class="flex justify-between text-gray-400 text-sm mb-4 pb-2 border-b border-gray-700">
      <span>Item</span>
      <div class="flex gap-8">
        <span>Qty</span>
        <span class="w-20 text-right">Price</span>
      </div>
    </div>

    <!-- Order Items List -->
    <div class="flex-1 overflow-y-auto space-y-4 mb-6">
      <div
        v-for="item in orderItems"
        :key="item.id"
        class="space-y-3"
      >
        <!-- Item Row -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3 flex-1">
            <img
              :src="item.image"
              :alt="item.name"
              class="w-10 h-10 rounded-full object-cover"
            />
            <div class="flex-1 min-w-0">
              <h4 class="text-white text-sm font-medium truncate">
                {{ item.name }}
              </h4>
              <p class="text-gray-400 text-xs">$ {{ item.price.toFixed(2) }}</p>
            </div>
          </div>

          <div class="flex items-center gap-4">
            <!-- Quantity -->
            <div class="bg-[#252836] rounded-lg px-3 py-1 min-w-[50px] text-center">
              <span class="text-white text-sm">{{ item.quantity }}</span>
            </div>

            <!-- Total Price -->
            <div class="w-20 text-right">
              <span class="text-white font-medium text-sm">
                $ {{ (item.price * item.quantity).toFixed(2) }}
              </span>
            </div>

            <!-- Delete Button -->
            <button
              @click="removeItem(item.id)"
              class="p-2 border border-[#FF6B6B] text-[#FF6B6B] rounded-lg hover:bg-[#FF6B6B] hover:text-white transition-colors"
              :aria-label="`Remove ${item.name}`"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
            </button>
          </div>
        </div>

        <!-- Order Note -->
        <div v-if="item.note || item.showNoteInput">
          <input
            v-model="item.note"
            type="text"
            placeholder="Order Note..."
            class="w-full bg-[#252836] text-gray-400 text-sm px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:border-[#EA7C69] placeholder-gray-500"
          />
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-if="orderItems.length === 0"
        class="flex flex-col items-center justify-center py-12 text-gray-400"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-16 w-16 mb-4 opacity-50"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
        <p class="text-sm">Your cart is empty</p>
      </div>
    </div>

    <!-- Order Summary -->
    <div class="space-y-3 border-t border-gray-700 pt-4">
      <div class="flex justify-between text-gray-400 text-sm">
        <span>Discount</span>
        <span class="text-white">$ {{ discount.toFixed(2) }}</span>
      </div>
      <div class="flex justify-between text-gray-400 text-sm">
        <span>Sub total</span>
        <span class="text-white font-medium">$ {{ subtotal.toFixed(2) }}</span>
      </div>
    </div>

    <!-- Continue to Payment Button -->
    <button
      @click="continueToPayment"
      :disabled="orderItems.length === 0"
      :class="[
        'w-full mt-6 py-4 rounded-lg font-medium transition-all',
        orderItems.length > 0
          ? 'bg-[#EA7C69] hover:bg-[#E66A5E] text-white'
          : 'bg-gray-700 text-gray-500 cursor-not-allowed'
      ]"
    >
      Continue to Payment
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// Props
const props = defineProps({
  orderNumber: {
    type: String,
    required: true
  },
  orderItems: {
    type: Array,
    required: true,
    default: () => []
  },
  discount: {
    type: Number,
    default: 0
  }
})

// Emits
const emit = defineEmits(['remove-item', 'update-order-type', 'continue-payment'])

// State
const orderTypes = ['Dine In', 'To Go', 'Delivery']
const selectedOrderType = defineModel('selectedOrderType', { default: 'Dine In' })

// Computed
const subtotal = computed(() => {
  return props.orderItems.reduce((sum, item) => {
    return sum + (item.price * item.quantity)
  }, 0)
})

// Methods
const removeItem = (itemId) => {
  emit('remove-item', itemId)
}

const continueToPayment = () => {
  if (props.orderItems.length > 0) {
    emit('continue-payment', {
      orderType: selectedOrderType.value,
      items: props.orderItems,
      subtotal: subtotal.value,
      discount: props.discount,
      total: subtotal.value - props.discount
    })
  }
}
</script>

<style scoped>
/* Custom scrollbar for order items */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #252836;
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #3C3F50;
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #4A4E5E;
}
</style>