<template>
  <v-menu v-model="menu" :close-on-content-click="false" location="end">
    <template v-slot:activator="{ props }">
      <v-avatar class="avatar-position" size="66" v-bind="props">
        <v-icon icon="mdi-account-circle" size="52"></v-icon>
      </v-avatar>
    </template>

    <v-card>
      <v-list>
        <v-list-item>
          <v-btn
            v-if="loginStore.isAuthenticated == false"
            @click="openLoginDialog"
            variant="text"
            color="primary"
          >
            Log In
          </v-btn>
          <v-btn v-else variant="text" color="primary" @click="loginStore.logout(), router.push('/')"> Log out </v-btn>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-btn style="border-radius: 10px; margin: 10px" @click="toggleTheme">
            <v-icon
              v-if="theme.isDark == true"
              class="mdi mdi-weather-sunny"
            ></v-icon>
            <v-icon v-else class="mdi mdi-weather-night"></v-icon>
          </v-btn>
        </v-list-item>
      </v-list>

      <v-card-actions>
        <v-btn variant="text" @click="menu = false"> Cancel </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
  <!-- Login Dialog -->
  <v-dialog v-model="dialog" max-width="400">
    <v-card>
      <v-card-title>
        <span class="headline">Log In</span>
      </v-card-title>

      <v-card-text>
        <log-in-comp></log-in-comp>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="dialog = false">Schließen</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- Other content -->
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useChangeThemeStore } from "../stores/changeTheme.store";
import { useLoginStore } from "../stores/login.store";
import router from "../router";

const loginStore = useLoginStore();
const { toggleTheme } = useChangeThemeStore();
const theme = useChangeThemeStore();

const menu = ref(false);
const dialog = ref(false);

const openLoginDialog = () => {
  menu.value = false;
  dialog.value = true;
};



</script>

<style scoped>
.toggleThemeBtn {
  position: fixed;
  top: 30px;
  left: 30px;
  z-index: 1000;
  cursor: pointer;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.avatar-position {
  position: fixed;
  top: 30px;
  right: 30px;
  cursor: pointer;
  z-index: 1000;
}
</style>
