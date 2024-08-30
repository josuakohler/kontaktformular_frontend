<script setup lang="ts">
import { ref } from "vue";

const dialog = ref(false);
</script>

<template>
  <v-app>
    <v-content>
      <!-- Avatar -->
      <v-avatar 
        class="avatar-position"
        color="#fff"
        size="66"
        @click="dialog = true"
      >
        <v-icon icon="mdi-account-circle" color="black" size="52"></v-icon>
      </v-avatar>
      
      <kontakt-form-comp></kontakt-form-comp>

      <!-- Dialog -->
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
    </v-content>
  </v-app>
</template>

<style scoped>
.avatar-position {
  position: fixed;
  top: 30px;
  right: 30px;
  z-index: 1000;
  cursor: pointer;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Add a subtle shadow */
  background-color: #ff0000; /* Dark background matching your mockup */
}

.v-avatar {
  width: 56px;
  height: 56px;
}

.v-avatar:hover {
  background-color: #9d9d9d; /* Slightly lighter background on hover */
}

.v-icon {
  color: #ffffff; /* White icon color to match mockup */
}

.v-card {
  border-radius: 8px; /* Rounded corners for the dialog */
}
</style>

