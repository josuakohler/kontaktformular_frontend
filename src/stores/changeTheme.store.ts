// stores/message.store.ts
import { defineStore } from "pinia";
import { ref } from "vue";
import { useTheme } from "vuetify";

export const useChangeThemeStore = defineStore("changeThemeStore", () => {
  const { global } = useTheme();
  const isDark = ref(global.current.value.dark);

  const toggleTheme = () => {
    isDark.value = !isDark.value;
    global.name.value = isDark.value ? "dark" : "light";
  };

  return { isDark, toggleTheme };
});
