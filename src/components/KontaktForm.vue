<template>
  <home-comp></home-comp>
  <v-container>
    <v-row class="justify-center">
      <v-col cols="12" md="5">
        <v-text-field
          v-model="firstname"
          label="First name"
          outlined
          hide-details
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="5">
        <v-text-field
          v-model="lastname"
          label="Last name"
          outlined
          hide-details
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="10">
        <v-text-field
          v-model="mail"
          label="E-mail"
          outlined
          hide-details
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="10">
        <v-textarea
          v-model="messageText"
          label="Message"
          outlined
          hide-details
        ></v-textarea>
      </v-col>
      <v-col cols="12" md="10" class="d-flex align-center">
        <v-checkbox v-model="privacyPolicy" hide-details required>
          <template v-slot:label>
            I have read the
            <a
              @click="showPolicy()"
              target="_blank"
              class="green-link"
              rel="noopener noreferrer"
              >privacy policy</a
            >
            and agree to the processing of my data.
          </template>
        </v-checkbox>
      </v-col>
      <v-col cols="12" md="10">
        <v-btn @click="submitMessage" class="send-btn" color="green">
          send
        </v-btn>
      </v-col>

      <v-snackbar
        v-model="showIsSentMessage"
        :color="snackbarColor"
        timeout="3000"
      >
        {{ snackBarText }}
      </v-snackbar>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useMessageStore } from "../stores/message.store";
import { Message } from "../types/message";
import { useSendMessageStore } from "../stores/send.store";
import { useRouter } from "vue-router";

const router = useRouter();
const messageStore = useMessageStore();
const sendStore = useSendMessageStore();
const snackbarColor = ref("");
const firstname = ref("");
const lastname = ref("");
const mail = ref("");
const messageText = ref("");
const privacyPolicy = ref(false);
const showIsSentMessage = ref(false);
const snackBarText = ref("");

const showPolicy = () => {
  router.push("/privacy-policy");
};

const submitMessage = () => {
  if (!privacyPolicy.value) {
    snackbarColor.value = "red";
    snackBarText.value = "Please agree to the privacy policy.";
    showIsSentMessage.value = true;

    return;
  } else if (
    !firstname.value ||
    !lastname.value ||
    !mail.value ||
    !messageText.value
  ) {
    snackbarColor.value = "red";
    snackBarText.value = "Please fill in all required fields.";
    showIsSentMessage.value = true;
    return;
  }

  const newMessage: Omit<Message, "id"> = {
    firstname: firstname.value,
    lastname: lastname.value,
    mail: mail.value,
    message: messageText.value,
  };

  sendStore.firstName = firstname.value;
  sendStore.lastName = lastname.value;
  sendStore.email = mail.value;
  sendStore.sendMessage();

  messageStore.createMessage(newMessage);

  // Reset form fields
  firstname.value = "";
  lastname.value = "";
  mail.value = "";
  messageText.value = "";
  privacyPolicy.value = false;

  snackbarColor.value = "green";
  snackBarText.value = "Message sent succesfully";
  showIsSentMessage.value = true;
};
</script>

<style>
.v-application__wrap {
  min-height: 0dvh;
  display: flex;
  justify-content: center; /* Zentriert horizontal */
  align-items: center; /* Zentriert vertikal */
}

.send-btn:hover {
  background-color: #e0e0e0;
}

.green-link {
  color: rgb(0, 255, 0);
  text-decoration: none;
}

.green-link:hover {
  text-decoration: underline;
}
</style>
