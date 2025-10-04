<script scope>
import { ref, computed } from "vue";
import Discount from "@/assets/images/discount.png";
import Home from "@/assets/images/home.png";
import Message from "@/assets/images/message.png";
import Store from "@/assets/images/store.png";
import Logout from "@/assets/images/logout.png";
import Setting from "@/assets/images/setting.png";
import Notification from "@/assets/images/notification.png";
import Graph from "@/assets/images/graph.png";


export default {
  name: "Sidebar",
  components: {
    Store,
    Graph,
    Home,
    Discount,
    Message,
    Setting,
    Logout,
    Notification,
  },
  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
    customNavItems: {
      type: Array,
      default: () => [],
    },
    defaultActiveItem: {
      type: String,
      default: "home",
    },
  },
  setup(props, { emit }) {
    const isCollapsed = ref(props.collapsed);
    const activeItem = ref(props.defaultActiveItem);

    const defaultNavItems = [
      {
        name: "store",
        label: "Store",
        icon: Store,
      },
      {
        name: "home",
        label: "Home",
        icon: Home,
      },
      {
        name: "analytics",
        label: "Analytics",
        icon: Discount,
      },
      {
        name: "charts",
        label: "Charts",
        icon: Graph,
      },
      {
        name: "messages",
        label: "Messages",
        icon: Message,
      },
      {
        name: "notifications",
        label: "Notifications",
        icon: Notification,
      },
      {
        name: "settings",
        label: "Settings",
        icon: Setting,
      },
      {
        name: "logout",
        label: "Logout",
        icon: Logout,
      },
    ];

    const navItems = computed(() => {
      return props.customNavItems.length > 0
        ? props.customNavItems
        : defaultNavItems;
    });

    const toggleCollapse = () => {
      isCollapsed.value = !isCollapsed.value;
      emit("collapse-change", isCollapsed.value);
    };

    const setActiveItem = (itemName) => {
      activeItem.value = itemName;
      emit("item-click", itemName);
    };

    const getIconClass = (item) => {
      return {
        active: activeItem.value === item.name,
        "gradient-orange-red": item.gradient === "orange-red",
        "gradient-salmon": item.gradient === "salmon",
        "gradient-orange": item.gradient === "orange",
      };
    };

    return {
      isCollapsed,
      activeItem,
      navItems,
      toggleCollapse,
      setActiveItem,
      getIconClass,
    };
  },
};
</script>

<template>
  <div
    class="sidebar w-[104px] bg-[#1F1D2B] text-white flex flex-col justify-center items-center overflow-hidden h-screen"
    :class="{ collapsed: isCollapsed }"
  >
    <div
      v-for="(item, index) in navItems"
      :key="index"
      class="relative flex items-center flex-col justify-between h-full w-full cursor-pointer p-3"
      :class="{ active: activeItem === item.name }"
      @click="setActiveItem(item.name)"
    >
    
      <img
        :src="item.icon"
        class="nav-icon"
        :class="getIconClass(item)"
        :alt="item.label"
      />
         
    </div>

  </div>
</template>
