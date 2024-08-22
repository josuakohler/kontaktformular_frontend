<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="5">
        <v-text-field
          v-model="firstname"
          :counter="10"
          label="First name"
          hide-details
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="5">
        <v-text-field
          v-model="lastname"
          :counter="10"
          label="Last name"
          hide-details
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="10">
        <v-text-field
          v-model="mail"
          label="E-mail"
          hide-details
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="10">
        <v-textarea v-model="messageText" label="message"> </v-textarea>
      </v-col>
      <v-btn @click="submitMessage"> senden </v-btn>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useMessageStore } from "../stores/message.store";
import { Message } from "../types/message";

const messageStore = useMessageStore();

const firstname = ref("");
const lastname = ref("");
const mail = ref("");
const messageText = ref("");

const submitMessage = () => {
  const newMessage: Omit<Message, "id"> = {
    firstname: firstname.value,
    lastname: lastname.value,
    mail: mail.value,
    message: messageText.value,
  };
  messageStore.createMessage(newMessage);
  // Reset form fields
  firstname.value = "";
  lastname.value = "";
  mail.value = "";
  messageText.value = "";
};
</script>

<style>
.v-application__wrap {
  min-height: 0dvh;
}
</style>
