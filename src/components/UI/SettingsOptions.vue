<template>
  <div class="h-full w-[500px] bg-[#201D2B] text-white rounded-md py-4">
    <div class="">
      <!-- Appearance -->
      <div
        @click="activeSection = 'appearance'"
        :class="[
          'flex items-start gap-4 p-6 cursor-pointer transition-all',
          activeSection === 'appearance'
            ? 'bg-[#6c5248]'
            : 'bg-[#1f1d2b] hover:bg-[#2d303e]',
        ]"
      >
        <div
          :class="[
            'flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center',
            activeSection === 'appearance' ? 'bg-[#ff6b6b]' : '',
          ]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
            ></path>
          </svg>
        </div>
        <div class="flex-1">
          <h3 class="text-base font-medium mb-1">Appearance</h3>
          <p class="text-sm text-gray-400">Dark and Light mode, Font size</p>
        </div>
        <div
          v-if="activeSection === 'appearance'"
          class="flex-shrink-0 w-1 h-12 bg-[#ff6b6b] rounded-full"
        ></div>
      </div>

      <!-- Your Restaurant -->
      <div
        @click="activeSection = 'restaurant'"
        :class="[
          'flex items-start gap-4 p-6 cursor-pointer transition-all',
          activeSection === 'restaurant'
            ? 'bg-[#6c5248]'
            : 'bg-[#1f1d2b] hover:bg-[#2d303e]',
        ]"
      >
        <div
          :class="[
            'flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center',
            activeSection === 'restaurant' ? 'bg-[#54363B]' : '',
          ]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        </div>
        <div class="flex-1">
          <h3 class="text-base font-medium mb-1">Your Restaurant</h3>
          <p class="text-sm text-gray-400">Dark and Light mode, Font size</p>
        </div>
        <div
          v-if="activeSection === 'restaurant'"
          class="flex-shrink-0 w-1 h-12 bg-[#54363B] rounded-full"
        ></div>
      </div>

      <!-- Products Management -->
      <div
        @click="activeSection = 'products'"
        :class="[
          'flex items-start gap-4 p-6 cursor-pointer transition-all',
          activeSection === 'products'
            ? 'bg-[#6c5248]'
            : 'bg-[#1f1d2b] hover:bg-[#2d303e]',
        ]"
      >
        <div
          :class="[
            'flex-shrink-0 w-12 h-12 flex items-center justify-center',
            activeSection === 'products' ? 'bg-[#54363B]' : '',
          ]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="3"></circle>
            <path
              d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
            ></path>
          </svg>
        </div>
        <div class="flex-1">
          <h3
          :class="[
          'text-base font-medium mb-1',
          activeSection === 'products'
            ? 'text-[#EA7D6A]'
            : 'text-white',
        ]"
          >Products Management</h3>
          <p class="text-sm text-gray-400">Manage your product, pricing, etc</p>
        </div>
        <div
          v-if="activeSection === 'products'"
          class="flex-shrink-0 w-1 h-12 bg-[#54363B] rounded-full"
        ></div>
      </div>

      <!-- Notifications -->
      <div
        @click="activeSection = 'notifications'"
        :class="[
          'flex items-start gap-4 p-6 cursor-pointer transition-all',
          activeSection === 'notifications'
            ? 'bg-[#6c5248]'
            : 'bg-[#1f1d2b] hover:bg-[#2d303e]',
        ]"
      >
        <div
          :class="[
            'flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center',
            activeSection === 'notifications' ? 'bg-[#54363B]' : '',
          ]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
        </div>
        <div class="flex-1">
          <h3 class="text-base font-medium mb-1">Notifications</h3>
          <p class="text-sm text-gray-400">Customize your notifications</p>
        </div>
        <div
          v-if="activeSection === 'notifications'"
          class="flex-shrink-0 w-1 h-12 bg-[#54363B] rounded-full"
        ></div>
      </div>

      <!-- Security -->
      <div
        @click="activeSection = 'security'"
        :class="[
          'flex items-start gap-4 p-6 cursor-pointer transition-all',
          activeSection === 'security'
            ? 'bg-[#6c5248]'
            : 'bg-[#1f1d2b] hover:bg-[#2d303e]',
        ]"
      >
        <div
          :class="[
            'flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center',
            activeSection === 'security' ? 'bg-[#54363B]' : '',
          ]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </div>
        <div class="flex-1">
          <h3 class="text-base font-medium mb-1">Security</h3>
          <p class="text-sm text-gray-400">Configure Password, PIN, etc</p>
        </div>
        <div
          v-if="activeSection === 'security'"
          class="flex-shrink-0 w-1 h-12 bg-[#54363B] rounded-full"
        ></div>
      </div>

      <!-- About Us -->
      <div
        @click="activeSection = 'about'"
        :class="[
          'flex items-start gap-4 p-6 cursor-pointer transition-all',
          activeSection === 'about'
            ? 'bg-[#6c5248]'
            : 'bg-[#1f1d2b] hover:bg-[#2d303e]',
        ]"
      >
        <div
          :class="[
            'flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center',
            activeSection === 'about' ? 'bg-[#54363B]' : '',
          ]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        </div>
        <div class="flex-1">
          <h3 class="text-base font-medium mb-1">About Us</h3>
          <p class="text-sm text-gray-400">Find out more about Posly</p>
        </div>
        <div
          v-if="activeSection === 'about'"
          class="flex-shrink-0 w-1 h-12 bg-[#54363B] rounded-full"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeSection: "products",
    };
  },
};
</script>
