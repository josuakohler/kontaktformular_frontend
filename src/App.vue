<script setup lang="ts">
import { ref } from "vue";
import LogInComp from "./components/LogIn.vue"; // Pfad anpassen, falls nötig

// Ref für den Dialog-Status
const dialog = ref(false);
</script>

<template>
  <v-app>
    <v-content>
      <kontakt-form-comp> </kontakt-form-comp>
      <!-- Avatar -->
      <v-avatar color="info" @click="dialog = true">
        <v-icon icon="mdi-account-circle"></v-icon>
      </v-avatar>

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
            <v-btn color="primary" @click="dialog = false"
              >Schließen</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-content>
  </v-app>
</template>

<style></style>
