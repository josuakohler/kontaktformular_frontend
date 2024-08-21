<template>
  <div class="container">
    <div class="name-input">
      <input v-model="firstname" type="text" placeholder="first name" />
      <input v-model="lastname" type="text" placeholder="last name" />
    </div>
    <div class="mail-input">
      <input
        v-model="mail"
        type="text"
        name="email"
        id="mail-input-id"
        placeholder="e-mail"
      />
    </div>
    <div class="message-input">
      <textarea
        v-model="messageText"
        name="message"
        id="message-input-id"
        placeholder="message"
      ></textarea>
    </div>
    <button @click="submitMessage">send</button>
  </div>
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
