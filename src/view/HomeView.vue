<template>
  <div class="min-h-screen w-full bg-[#252836] text-white">
    <div class="flex h-screen">
      <!-- ========================================
           LEFT SECTION: MENU & DISHES
      ======================================== -->
      <div class="flex-1 overflow-y-auto p-8">
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-white mb-1">Jaegar Resto</h1>
          <p class="text-gray-400 text-sm">{{ currentDate }}</p>
        </div>

        <!-- Category Navigation -->
        <nav class="flex gap-8 mb-8 border-b border-gray-700">
          <button
            v-for="category in categories"
            :key="category"
            @click="activeCategory = category"
            :class="[
              'pb-4 text-sm font-medium transition-colors whitespace-nowrap',
              activeCategory === category
                ? 'text-[#EA7C69] border-b-2 border-[#EA7C69]'
                : 'text-gray-400 hover:text-white'
            ]"
          >
            {{ category }}
          </button>
        </nav>

        <!-- Choose Dishes Header with Dine Option Dropdown -->
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-bold">Choose Dishes</h2>
          
          <!-- Dine Option Dropdown -->
          <div class="relative">
            <button
              @click="toggleDineOptions"
              class="flex items-center gap-2 bg-[#1F1D2B] px-4 py-2 rounded-lg border border-gray-700 hover:bg-[#252836] transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
              <span class="text-sm">{{ selectedDineOption }}</span>
            </button>
            
            <!-- Dropdown Menu -->
            <transition name="fade">
              <div
                v-if="showDineOptions"
                v-click-outside="closeDineOptions"
                class="absolute top-full right-0 mt-2 w-40 bg-[#1F1D2B] border border-gray-700 rounded-lg shadow-xl z-10"
              >
                <button
                  v-for="option in dineOptions"
                  :key="option"
                  @click="selectDineOption(option)"
                  class="block w-full text-left text-sm px-4 py-2 hover:bg-[#252836] transition-colors first:rounded-t-lg last:rounded-b-lg"
                >
                  {{ option }}
                </button>
              </div>
            </transition>
          </div>
        </div>

        <!-- Dishes Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
          <DishCard
            v-for="dish in filteredDishes"
            :key="dish.id"
            :title="dish.title"
            :price="dish.price"
            :available="dish.available"
            :image="dish.image"
            @add-to-cart="addToCart"
          />
        </div>

        <!-- Empty State -->
        <div
          v-if="filteredDishes.length === 0"
          class="flex flex-col items-center justify-center py-20 text-gray-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-16 w-16 mb-4 opacity-50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p class="text-lg">No dishes available in this category</p>
        </div>
      </div>

      <!-- ========================================
           RIGHT SECTION: ORDER CARD
      ======================================== -->
      <div class="w-[400px] bg-[#1F1D2B] border-l border-gray-800 flex flex-col">
        <div class="p-6 flex-1 overflow-hidden flex flex-col">
          <!-- Search Bar -->
          <div class="mb-6">
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search for food, coffe, etc.."
                class="w-full bg-[#252836] text-white text-sm px-4 py-3 pl-10 rounded-lg border border-gray-700 focus:outline-none focus:border-[#EA7C69] placeholder-gray-500"
                @input="handleSearch"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="absolute left-3 top-3.5 h-5 w-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </div>
          </div>

          <!-- Order Card Component -->
          <OrderCard
            :order-number="orderNumber"
            :order-items="orderItems"
            :discount="discount"
            v-model:selected-order-type="orderType"
            @remove-item="removeFromOrder"
            @continue-payment="handlePayment"
            @update-quantity="updateItemQuantity"
            @update-note="updateItemNote"
          />
        </div>
      </div>
    </div>

    <!-- Success Notification (Optional) -->
    <transition name="slide-up">
      <div
        v-if="showNotification"
        class="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-[#EA7C69] text-white px-6 py-3 rounded-lg shadow-xl z-50"
      >
        <div class="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>{{ notificationMessage }}</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import DishCard from '@/components/UI/DishCard.vue'
import OrderCard from '@/components/UI/OrderCard.vue'
import dishes from "@/mock/dishes-data.js"


// ========================================
// STATE MANAGEMENT
// ========================================

// Navigation & UI State
const activeCategory = ref('Hot Dishes')
const selectedDineOption = ref('Dine In')
const showDineOptions = ref(false)
const searchQuery = ref('')
const showNotification = ref(false)
const notificationMessage = ref('')

// Order State
const orderType = ref('Dine In')
const orderNumber = ref('34562')
const discount = ref(0)
const orderItems = ref([
  {
    id: 1,
    name: 'Spicy seasoned seafood noodles',
    price: 2.29,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&q=80',
    note: 'Please, just a little bit spicy only.',
    showNoteInput: true
  },
  {
    id: 2,
    name: 'Salted pasta with mushroom sauce',
    price: 2.69,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80',
    note: '',
    showNoteInput: true
  },
 
])

// ========================================
// CONSTANTS
// ========================================

const categories = ['Hot Dishes', 'Cold Dishes', 'Soup', 'Grill', 'Appetizer', 'Dessert']
const dineOptions = ['Dine In', 'To Go', 'Delivery']



// ========================================
// COMPUTED PROPERTIES
// ========================================

const currentDate = computed(() => {
  const options = { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' }
  return new Date().toLocaleDateString('en-US', options)
})

const currentDishes = computed(() => {
  return dishes[activeCategory.value] || []
})

const filteredDishes = computed(() => {
  if (!searchQuery.value.trim()) {
    return currentDishes.value
  }
  
  const query = searchQuery.value.toLowerCase().trim()
  return currentDishes.value.filter(dish => 
    dish.title.toLowerCase().includes(query)
  )
})

// ========================================
// METHODS
// ========================================

const toggleDineOptions = () => {
  showDineOptions.value = !showDineOptions.value
}

const closeDineOptions = () => {
  showDineOptions.value = false
}

const selectDineOption = (option) => {
  selectedDineOption.value = option
  orderType.value = option
  showDineOptions.value = false
}

const addToCart = (dish) => {
  // Check if dish already exists in order
  const existingItem = orderItems.value.find(
    item => item.name.toLowerCase() === dish.title.toLowerCase()
  )
  
  if (existingItem) {
    // Increment quantity if exists
    existingItem.quantity++
  } else {
    // Add new item to order
    const newId = orderItems.value.length > 0 
      ? Math.max(...orderItems.value.map(item => item.id)) + 1 
      : 1
    
    orderItems.value.push({
      id: newId,
      name: dish.title,
      price: dish.price,
      quantity: 1,
      image: dish.image,
      note: '',
      showNoteInput: false
    })
  }
  
  // Show success notification
  showSuccessNotification(`${dish.title} added to cart`)
}

const removeFromOrder = (itemId) => {
  const item = orderItems.value.find(item => item.id === itemId)
  if (item) {
    orderItems.value = orderItems.value.filter(item => item.id !== itemId)
    showSuccessNotification(`${item.name} removed from cart`)
  }
}

const updateItemQuantity = (itemId, newQuantity) => {
  const item = orderItems.value.find(item => item.id === itemId)
  if (item && newQuantity > 0) {
    item.quantity = newQuantity
  }
}

const updateItemNote = (itemId, note) => {
  const item = orderItems.value.find(item => item.id === itemId)
  if (item) {
    item.note = note
  }
}

const handleSearch = () => {
  // Search is handled by computed property filteredDishes
  // This method can be used for analytics or additional logic
  console.log('Searching for:', searchQuery.value)
}

const handlePayment = (orderData) => {
  console.log('Processing payment for order:', orderData)
  
  // Show success message
  alert(
    `Order #${orderNumber.value} placed successfully!\n\n` +
    `Type: ${orderData.orderType}\n` +
    `Items: ${orderData.items.length}\n` +
    `Subtotal: $${orderData.subtotal.toFixed(2)}\n` +
    `Discount: $${orderData.discount.toFixed(2)}\n` +
    `Total: $${orderData.total.toFixed(2)}`
  )
  
  // Here you would typically:
  // 1. Navigate to payment page
  // 2. Send order to backend API
  // 3. Clear cart after successful payment
  
  // Example: Clear cart and reset
  // orderItems.value = []
  // generateNewOrderNumber()
}

const showSuccessNotification = (message) => {
  notificationMessage.value = message
  showNotification.value = true
  
  setTimeout(() => {
    showNotification.value = false
  }, 3000)
}

const generateNewOrderNumber = () => {
  orderNumber.value = Math.floor(10000 + Math.random() * 90000).toString()
}

// ========================================
// DIRECTIVES
// ========================================

// Custom directive for click outside
const vClickOutside = {
  mounted(el, binding) {
    el.clickOutsideEvent = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value()
      }
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el) {
    document.removeEventListener('click', el.clickOutsideEvent)
  }
}

// ========================================
// LIFECYCLE HOOKS
// ========================================

onMounted(() => {
  console.log('MenuPage mounted successfully')
})

onUnmounted(() => {
  console.log('MenuPage unmounted')
})
</script>

<style scoped>
/* ========================================
   SCROLLBAR STYLES
======================================== */
.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #252836;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #3C3F50;
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #4A4E5E;
}

/* ========================================
   TRANSITIONS
======================================== */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translate(-50%, 20px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translate(-50%, 20px);
}
</style>