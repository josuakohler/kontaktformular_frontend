<script setup lang="ts">
import { ref } from "vue";
import { useLoginStore } from "../stores/login.store";

// Ref für den Dialog-Status
const dialog = ref(false);

// Login-Store
const loginStore = useLoginStore();
</script>

<template>
  <router-view></router-view>
</template>

<style></style>
