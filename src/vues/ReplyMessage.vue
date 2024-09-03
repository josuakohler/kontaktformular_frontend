<template>
  <home-comp></home-comp>
  <v-btn class="goBackBtn" @click="goBack()">back</v-btn>

  <v-container>
    <v-card>
      <v-card-title>Reply to Message</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="handleSubmit">
          <v-text-field
            v-model="fromEmail"
            label="From"
            readonly
            outlined
            dense
          ></v-text-field>

          <v-text-field
            v-model="toEmail"
            label="To"
            readonly
            outlined
            dense
          ></v-text-field>

          <v-textarea
            v-model="store.message"
            label="Message"
            outlined
            auto-grow
            rows="6"
          ></v-textarea>

          <v-btn type="submit" color="green" block>Send Reply</v-btn>
        </v-form>
      </v-card-text>
    </v-card>

    <v-snackbar v-model="snackbar" :color="snackbarColor" timeout="3000">
      {{ snackbarText }}
    </v-snackbar>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useSendMessageStore } from "../stores/send.store";
import router from "../router";

const store = useSendMessageStore();
const { replyMessage } = store;
onMounted(() => {
  console.log(store.email);
});

const fromEmail = ref("josuaspyrox@gmail.com"); // Replace with actual sender's email
const toEmail = ref(store.email); // Replace with actual recipient's email

const snackbar = ref(false);
const snackbarText = ref("");
const snackbarColor = ref("");

const goBack = () => {
  router.push("/respond");
};

const handleSubmit = async () => {
  if (!store.message.trim()) {
    snackbarText.value = "Please enter a message";
    snackbarColor.value = "error";
    snackbar.value = true;
    return;
  }

  await replyMessage();

  if (store.error) {
    snackbarText.value = store.error;
    snackbarColor.value = "error";
  } else {
    snackbarText.value = "Message sent successfully";
    snackbarColor.value = "success";
    store.message = ""; // Clear the message after successful send
  }
  snackbar.value = true;
};
</script>

<style>
.goBackBtn {
  justify-content: left;
  align-content: left;
}
</style>
