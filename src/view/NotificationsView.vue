<template>
  <div class="min-h-screen bg-[#252836] p-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-white text-3xl font-bold mb-8">Notifications</h1>

      <!-- Notifications List -->
      <div class="space-y-4">
        <div
          v-for="notification in notifications"
          :key="notification.id"
          class="bg-[#201D2B] rounded-2xl p-6 shadow-sm"
        >
          <!-- Order Header -->
          <div class="flex items-start justify-between mb-4">
            <div class="flex items-center gap-4">
              <!-- Status Icon -->
              <div
                :class="[
                  'w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0',
                  notification.status === 'success' ? 'bg-[#50D1AA]' : 
                  notification.status === 'cancelled' ? 'bg-[#FF6B6B]' : 
                  'bg-[#FFB572]'
                ]"
              >
                <svg
                  v-if="notification.status === 'success'"
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-7 h-7 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="3"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <svg
                  v-else-if="notification.status === 'cancelled'"
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-7 h-7 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="3"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-7 h-7 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="3"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
              </div>

              <!-- Order Info -->
              <div>
                <h3 class="text-gray-900 text-lg font-semibold">
                  Order #{{ notification.orderNumber }}
                </h3>
                <p class="text-gray-500 text-sm mt-0.5">
                  {{ notification.message }}
                </p>
                <button
                  @click="toggleDetails(notification.id)"
                  class="flex items-center gap-1 text-gray-700 text-sm mt-2 hover:text-gray-900 transition-colors"
                >
                  <span>See Detail</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    :class="[
                      'w-4 h-4 transition-transform',
                      notification.showDetails ? 'rotate-180' : ''
                    ]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Time and Payment -->
            <div class="text-right flex-shrink-0 ml-4">
              <p class="text-gray-400 text-sm mb-2">{{ notification.time }}</p>
              <div class="flex items-center gap-3 justify-end">
                <p class="text-gray-900 text-lg font-bold">
                  ${{ notification.total.toFixed(2) }}
                </p>
                <span
                  v-if="notification.paymentMethod"
                  class="text-gray-600 text-sm"
                >
                  {{ notification.paymentMethod }}
                </span>
              </div>
            </div>
          </div>

          <!-- Order Details (Collapsible) -->
          <transition name="slide-fade">
            <div v-if="notification.showDetails && notification.items" class="mt-6 space-y-4">
              <div
                v-for="item in notification.items"
                :key="item.id"
                class="flex items-start gap-4"
              >
                <!-- Item Image -->
                <div class="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 text-2xl">
                  {{ item.emoji }}
                </div>

                <!-- Item Details -->
                <div class="flex-1">
                  <h4 class="text-gray-900 font-medium">{{ item.name }}</h4>
                  
                  <!-- Item Note -->
                  <p v-if="item.note" class="text-gray-500 text-sm mt-1">
                    Note : {{ item.note }}
                  </p>

                  <!-- Item Customizations -->
                  <div v-if="item.crust" class="text-gray-600 text-sm mt-1">
                    <span class="text-gray-500">Crust :</span> {{ item.crust }}
                  </div>
                  <div v-if="item.extras" class="text-gray-600 text-sm">
                    <span class="text-gray-500">Extras :</span> {{ item.extras }}
                  </div>

                  <!-- Price and Quantity -->
                  <div class="flex items-center gap-3 mt-2">
                    <span class="text-gray-700 font-medium">
                      ${{ item.price.toFixed(2) }}
                    </span>
                    <span class="text-gray-400 text-sm">
                      × {{ item.quantity }}
                    </span>
                  </div>
                </div>

                <!-- Item Total -->
                <div class="text-right flex-shrink-0">
                  <p class="text-gray-900 font-bold text-lg">
                    ${{ (item.price * item.quantity).toFixed(2) }}
                  </p>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-if="notifications.length === 0"
        class="bg-white rounded-2xl p-12 text-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-20 h-20 mx-auto mb-4 text-gray-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        <p class="text-gray-500 text-lg">No notifications yet</p>
        <p class="text-gray-400 text-sm mt-2">
          You'll see order updates and alerts here
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import notifidata from "@/mock/notifications-data.js"


// Notifications Data
const notifications = ref(notifidata)

// Methods
const toggleDetails = (notificationId) => {
  const notification = notifications.value.find(n => n.id === notificationId)
  if (notification) {
    notification.showDetails = !notification.showDetails
  }
}
</script>

<style scoped>
/* Slide Fade Transition */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s ease-in;
}

.slide-fade-enter-from {
  transform: translateY(-10px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #252836;
}

::-webkit-scrollbar-thumb {
  background: #3C3F50;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #4A4E5E;
}
</style>