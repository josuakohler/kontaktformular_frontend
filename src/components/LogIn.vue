<template>
    <v-sheet class="mx-auto" max-width="300">
      <v-form validate-on="submit lazy">
        <v-text-field
          label="User name"
        ></v-text-field>
        <v-text-field
        label="Password"
      ></v-text-field>
  
        <v-btn
          class="mt-2"
          text="Submit"
          type="submit"
          block
        ></v-btn>
      </v-form>
    </v-sheet>
</template>
  

<script setup lang="ts">

</script>

<style>

</style>