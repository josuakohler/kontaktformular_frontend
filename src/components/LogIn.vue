<template>
  <v-sheet class="mx-auto" max-width="300">
    <v-form @submit.prevent="handleSubmit">
      <v-text-field
        v-model="username"
        label="User name"
        required
      ></v-text-field>
      <v-text-field
        v-model="password"
        label="Password"
        type="password"
        required
      ></v-text-field>

      <v-btn
        class="mt-2"
        text="Submit"
        type="submit"
        block
        :loading="isLoading"
      ></v-btn>

      <v-alert v-if="loginStore.error" type="error" class="mt-3">
        {{ loginStore.error }}
      </v-alert>
    </v-form>
  </v-sheet>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useLoginStore } from "../stores/login.store";
import { useRouter } from "vue-router";

const loginStore = useLoginStore();
const router = useRouter();

const username = ref("");
const password = ref("");
const isLoading = ref(false);

const handleSubmit = async () => {
  isLoading.value = true;
  await loginStore.login(username.value, password.value);
  isLoading.value = false;

  if (loginStore.isAuthenticated) {
    console.log("is athenticated");
    router.push("/respond");
  }
};
</script>

<style>

</style>
