import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { useTheme } from "vuetify";

export const useChangeThemeStore = defineStore("changeThemeStore", () => {
  const { global } = useTheme();

  // Initialize the theme based on localStorage or default to the current theme
  const savedTheme = localStorage.getItem("theme");
  const isDark = ref(savedTheme ? savedTheme === "dark" : global.current.value.dark);

  // Set the theme name based on the saved value or the current theme
  global.name.value = isDark.value ? "dark" : "light";

  const toggleTheme = () => {
    isDark.value = !isDark.value;
    global.name.value = isDark.value ? "dark" : "light";

    // Save the selected theme to localStorage
    localStorage.setItem("theme", isDark.value ? "dark" : "light");
  };

  // Watch for changes in isDark to update localStorage
  watch(isDark, (newValue) => {
    localStorage.setItem("theme", newValue ? "dark" : "light");
  });

  return { isDark, toggleTheme };
});