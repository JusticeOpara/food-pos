<template>
  <div class="h-full w-full rounded-md bg-[#201D2B] text-white p-8">
    <!-- Header -->
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-semibold">Products Management</h1>
      <button
        class="flex items-center gap-2 px-6 py-3 border border-gray-600 rounded-lg hover:border-gray-500 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M12 1v6m0 6v6m6-12h-6m0 6h6m-6 6h6M6 6h6m0 6H6"></path>
        </svg>
        <span>Manage Categories</span>
      </button>
    </div>

    <!-- Category Tabs -->
    <div class="flex gap-8 mb-8 border-b border-gray-700">
      <button
        v-for="cat in categories"
        :key="cat"
        @click="activeCategory = cat"
        :class="[
          'pb-4 text-sm font-medium transition-colors relative',
          activeCategory === cat
            ? 'text-[#ff6b6b]'
            : 'text-gray-400 hover:text-gray-300',
        ]"
      >
        {{ cat }}
        <div
          v-if="activeCategory === cat"
          class="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff6b6b]"
        ></div>
      </button>
    </div>

    <!-- Dishes Grid -->
    <div class="grid grid-cols-3 gap-6 mb-8">
      <!-- Add New Dish Card -->
      <div
        @click="openAddModal"
        class="border-2  border-dashed border-gray-600 rounded-xl flex flex-col items-center justify-center h-[350px] cursor-pointer hover:border-[#ff6b6b] transition-colors group"
      >
        <div
          class="w-16 h-16 rounded-full border-2 border-gray-600 flex items-center justify-center mb-4 group-hover:border-[#ff6b6b] transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ff6b6b"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </div>
        <span class="text-[#ff6b6b] text-lg">Add new dish</span>
      </div>

      <!-- Existing Dishes -->
      <div
        v-for="dish in filteredDishes"
        :key="dish.id"
        class="bg-[#201D2B] rounded-xl overflow-hidden border border-[#393C49]"
      >
        <div class="p-6">
          <div
            class="w-full aspect-square rounded-full overflow-hidden mb-4 mx-auto max-w-[200px]"
          >
            <img
              :src="dish.image"
              :alt="dish.name"
              class="w-full h-full object-cover"
            />
          </div>
          <h3 class="text-center text-base font-medium mb-2">
            {{ dish.name }}
          </h3>
          <div
            class="flex items-center justify-center gap-2 text-sm text-gray-400"
          >
            <span class="font-medium">$ {{ dish.price.toFixed(2) }}</span>
            <span>•</span>
            <span>{{ dish.bowls }} Bowls</span>
          </div>
        </div>

        <div class="flex">
          <button
            @click="openEditModal(dish)"
            class="w-full bg-[#50343A] py-4 flex items-center justify-center gap-2 text-sm border-r-2 border-[#1f1d2b] hover:bg-[#5d3e44] transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
              ></path>
              <path
                d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
              ></path>
            </svg>
            <span>Edit dish</span>
          </button>

          <!-- delete button -->
          <button
            @click="deleteDish(dish.id)"
            class="w-full bg-[#50343A] py-4 flex items-center justify-center gap-2 text-sm hover:bg-[#8b3a3a] transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="3 6 5 6 21 6"></polyline>
              <path
                d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
              ></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
            <span>Delete dish</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Save/Discard Buttons -->
    <div v-if="hasChanges" class="flex gap-4">
      <button
        @click="discardChanges"
        class="px-12 py-4 border border-[#ff6b6b] text-[#ff6b6b] rounded-lg hover:bg-[#ff6b6b] hover:bg-opacity-10 transition-colors"
      >
        Discard Changes
      </button>
      <button
        @click="saveChanges"
        class="px-12 py-4 bg-[#ff8e8e] hover:bg-[#ff6b6b] text-white rounded-lg transition-colors"
      >
        Save Changes
      </button>
    </div>

    <!-- Add/Edit Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-[#2d303e] rounded-xl p-8 w-full max-w-md">
        <h2 class="text-2xl font-semibold mb-6">
          {{ isEditing ? "Edit Dish" : "Add New Dish" }}
        </h2>

        <div class="space-y-4">
          <div>
            <label class="block text-sm text-gray-400 mb-2">Dish Name</label>
            <input
              v-model="formData.name"
              type="text"
              class="w-full bg-[#1f1d2b] border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#ff6b6b]"
              placeholder="Enter dish name"
            />
          </div>

          <div>
            <label class="block text-sm text-gray-400 mb-2">Price ($)</label>
            <input
              v-model.number="formData.price"
              type="number"
              step="0.01"
              class="w-full bg-[#1f1d2b] border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#ff6b6b]"
              placeholder="0.00"
            />
          </div>

          <div>
            <label class="block text-sm text-gray-400 mb-2"
              >Available Bowls</label
            >
            <input
              v-model.number="formData.bowls"
              type="number"
              class="w-full bg-[#1f1d2b] border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#ff6b6b]"
              placeholder="0"
            />
          </div>

          <div>
            <label class="block text-sm text-gray-400 mb-2">Image URL</label>
            <input
              v-model="formData.image"
              type="text"
              class="w-full bg-[#1f1d2b] border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#ff6b6b]"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <label class="block text-sm text-gray-400 mb-2">Category</label>
            <select
              v-model="formData.category"
              class="w-full bg-[#1f1d2b] border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#ff6b6b]"
            >
              <option v-for="cat in categories" :key="cat" :value="cat">
                {{ cat }}
              </option>
            </select>
          </div>
        </div>

        <div class="flex gap-4 mt-8">
          <button
            @click="closeModal"
            class="flex-1 px-6 py-3 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            @click="submitForm"
            class="flex-1 px-6 py-3 bg-[#ff8e8e] hover:bg-[#ff6b6b] rounded-lg transition-colors"
          >
            {{ isEditing ? "Update" : "Add" }} Dish
          </button>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div
      v-if="showDeleteConfirm"
      class="fixed inset-0 bg-[#201D2B] bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-[#2d303e] rounded-xl p-8 w-full max-w-md">
        <h2 class="text-2xl font-semibold mb-4">Delete Dish</h2>
        <p class="text-gray-400 mb-6">
          Are you sure you want to delete "{{ dishToDelete?.name }}"? This
          action cannot be undone after saving.
        </p>

        <div class="flex gap-4">
          <button
            @click="cancelDelete"
            class="flex-1 px-6 py-3 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            @click="confirmDelete"
            class="flex-1 px-6 py-3 bg-[#ff6b6b] hover:bg-[#ff5252] text-white rounded-lg transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: [
        "Hot Dishes",
        "Cold Dishes",
        "Soup",
        "Grill",
        "Appetizer",
        "Dessert",
      ],
      activeCategory: "Hot Dishes",
      showModal: false,
      showDeleteConfirm: false,
      dishToDelete: null,
      isEditing: false,
      editingId: null,
      formData: {
        name: "",
        price: "",
        bowls: "",
        image: "",
        category: "Hot Dishes",
      },
      dishes: [],
      workingDishes: [],
      initialDishes: [
        {
          id: 1,
          name: "Spicy seasoned seafood noodles",
          price: 2.29,
          bowls: 20,
          image:
            "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=400&fit=crop",
          category: "Hot Dishes",
        },
        {
          id: 2,
          name: "Salted Pasta with mushroom sauce",
          price: 2.69,
          bowls: 30,
          image:
            "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=400&fit=crop",
          category: "Hot Dishes",
        },
     
      ],
    };
  },
  computed: {
    filteredDishes() {
      return this.workingDishes.filter(
        (dish) => dish.category === this.activeCategory
      );
    },
    hasChanges() {
      return (
        JSON.stringify(this.dishes) !== JSON.stringify(this.workingDishes)
      );
    },
  },
  methods: {
    loadDishes() {
      try {
        const saved = localStorage.getItem("restaurant_dishes");
        if (saved) {
          this.dishes = JSON.parse(saved);
        } else {
          this.dishes = [...this.initialDishes];
          // Save initial dishes to localStorage on first load
          localStorage.setItem(
            "restaurant_dishes",
            JSON.stringify(this.dishes)
          );
        }
        this.workingDishes = JSON.parse(JSON.stringify(this.dishes)); // Deep copy
      } catch (error) {
        console.error("Error loading dishes:", error);
        this.dishes = [...this.initialDishes];
        this.workingDishes = [...this.dishes];
      }
    },
    saveChanges() {
      try {
        this.dishes = JSON.parse(JSON.stringify(this.workingDishes)); // Deep copy
        localStorage.setItem("restaurant_dishes", JSON.stringify(this.dishes));
        alert("Changes saved successfully!");
      } catch (error) {
        console.error("Error saving dishes:", error);
        alert("Failed to save changes!");
      }
    },
    discardChanges() {
      this.workingDishes = JSON.parse(JSON.stringify(this.dishes)); // Deep copy
    },
    openAddModal() {
      this.showModal = true;
      this.isEditing = false;
      this.formData = {
        name: "",
        price: "",
        bowls: "",
        image: "",
        category: this.activeCategory,
      };
    },
    openEditModal(dish) {
      this.showModal = true;
      this.isEditing = true;
      this.editingId = dish.id;
      this.formData = {
        name: dish.name,
        price: dish.price,
        bowls: dish.bowls,
        image: dish.image,
        category: dish.category,
      };
    },
    closeModal() {
      this.showModal = false;
      this.isEditing = false;
      this.editingId = null;
    },
    deleteDish(dishId) {
      this.dishToDelete = this.workingDishes.find((d) => d.id === dishId);
      this.showDeleteConfirm = true;
    },
    confirmDelete() {
      if (this.dishToDelete) {
        this.workingDishes = this.workingDishes.filter(
          (d) => d.id !== this.dishToDelete.id
        );
      }
      this.cancelDelete();
    },
    cancelDelete() {
      this.showDeleteConfirm = false;
      this.dishToDelete = null;
    },
    submitForm() {
      if (!this.formData.name || !this.formData.price || !this.formData.bowls) {
        alert("Please fill in all required fields");
        return;
      }

      if (this.isEditing) {
        const index = this.workingDishes.findIndex(
          (d) => d.id === this.editingId
        );
        if (index !== -1) {
          this.workingDishes[index] = {
            id: this.editingId,
            name: this.formData.name,
            price: parseFloat(this.formData.price),
            bowls: parseInt(this.formData.bowls),
            image:
              this.formData.image ||
              "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop",
            category: this.formData.category,
          };
        }
      } else {
        const newDish = {
          id: Date.now(),
          name: this.formData.name,
          price: parseFloat(this.formData.price),
          bowls: parseInt(this.formData.bowls),
          image:
            this.formData.image ||
            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop",
          category: this.formData.category,
        };
        this.workingDishes.push(newDish);
      }

      this.closeModal();
    },
  },
  mounted() {
    this.loadDishes();
  },
};
</script>

<style scoped>
[v-cloak] {
  display: none;
}
</style>