<template>
  <v-app>
    <v-container
      fluid
      class="pa-0 fill-height d-flex flex-column"
      style="background-color: #333"
    >
      <v-row no-gutters class="fill-height">
        <v-col
          cols="3"
          class="d-flex flex-column border-end"
          style="background-color: white"
        >
          <div class="fixed-top">
            <v-list class="mb-0">
              <v-list-item
                title="Inbox"
                prepend-icon="mdi-inbox"
                class="neumorphism-list-item"
              ></v-list-item>
              <v-list-item class="mb-2">
                <v-text-field
                  outlined
                  dense
                  hide-details
                  placeholder="Search"
                  prepend-inner-icon="mdi-magnify"
                  class="neumorphism-input"
                  style="background-color: white; border-radius: 8px"
                ></v-text-field>
              </v-list-item>
            </v-list>
          </div>

          <v-list
            class="scrollable-list flex-grow-1"
            style="background-color: white"
          >
            <v-list-item
              v-for="msg in message.messages.slice().reverse()"
              :key="msg.id"
              @click="selectMessage(msg)"
              class="neumorphism-list-item"
            >
              <v-list-item-title>
                {{ msg.firstname }} {{ msg.lastname }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ msg.mail }}
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-col>

        <v-col class="d-flex flex-column overflow-hidden">
          <v-card flat class="fill-height d-flex flex-column">
            <v-card-title v-if="selectedMessage">
              <div>
                <div>from: {{ selectedMessage.mail }}</div>
                <div>to: info@jls.ch</div>
              </div>
            </v-card-title>
            <v-card-text v-if="selectedMessage" class="flex-grow-1">
              <v-card outlined class="mb-4 neumorphism-card">
                <v-card-text v-if="editingMessageId !== selectedMessage.id">
                  {{ selectedMessage.message }}
                </v-card-text>
                <v-text-field
                  v-else
                  v-model="editedMessage"
                  label="Edit message"
                  @keyup.enter="saveEdit(selectedMessage.id)"
                  class="neumorphism-input"
                  style="background-color: white; border-radius: 8px"
                ></v-text-field>
              </v-card>
              <v-btn
                color="primary"
                class="mr-2 neumorphism-button"
                @click="startEdit(selectedMessage.id, selectedMessage.message)"
              >
                {{ editingMessageId === selectedMessage.id ? "Save" : "Edit" }}
              </v-btn>
              <v-btn
                color="error"
                class="mr-2 neumorphism-button"
                @click="openDeleteDialog(selectedMessage.id)"
                >Delete</v-btn
              >
              <v-btn
                color="success"
                class="neumorphism-button"
                @click="sendMessage()"
                >Answer</v-btn
              >
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-dialog v-model="deleteDialog" max-width="400" persistent>
        <v-card title="Delete message?" class="neumorphism-card">
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="deleteDialog = false" class="neumorphism-button"
              >Cancel</v-btn
            >
            <v-btn
              @click="deleteMessage"
              color="error"
              class="neumorphism-button"
            >
              Delete {{ selectedMessageId }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-app>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
// import { useLoginStore } from "../stores/login.store";
import { useRouter } from "vue-router";
import { useMessageStore } from "../stores/message.store";
import type { Message } from "../types/message";
import { useSendMessageStore } from "../stores/send.store";

const sendStore = useSendMessageStore();
// const loginStore = useLoginStore();
const router = useRouter();
const message = useMessageStore();
const deleteDialog = ref(false);
const selectedMessageId = ref<number | null>(null);
const editingMessageId = ref<number | null>(null);
const editedMessage = ref("");
const selectedMessage = ref<Message | null>(null);

onMounted(() => {
  message.fetchMessages();
});

const selectMessage = (msg: Message) => {
  selectedMessage.value = msg;
  sendStore.firstName = selectedMessage.value.firstname;
  sendStore.lastName = selectedMessage.value.lastname;
  sendStore.email = selectedMessage.value.mail;
};

const openDeleteDialog = (id: number) => {
  selectedMessageId.value = id;
  deleteDialog.value = true;
};

const deleteMessage = () => {
  if (selectedMessageId.value !== null) {
    message.deleteMessage(selectedMessageId.value);
    deleteDialog.value = false;
    selectedMessageId.value = null;
    selectedMessage.value = null;
  }
};

const startEdit = (id: number, currentMessage: string) => {
  if (editingMessageId.value === id) {
    saveEdit(id);
  } else {
    editingMessageId.value = id;
    editedMessage.value = currentMessage;
  }
};

const saveEdit = (id: number) => {
  const index = message.messages.findIndex((msg: Message) => msg.id === id);

  if (index !== -1) {
    message.messages[index].message = editedMessage.value;
    message.updateMessage(id, editedMessage.value);
    if (selectedMessage.value) {
      selectedMessage.value.message = editedMessage.value;
    }
  }
  editingMessageId.value = null;
  editedMessage.value = "";
};

const sendMessage = () => {
  router.push("/send-message");
};

// const handleLogout = () => {
//   loginStore.logout();
//   router.push("/");
// };
</script>

<style scoped>
.v-application__wrap {
  background-color: #333; /* Background color matching your mockup */
}
.v-text-field,
.v-textarea {
  background-color: white; /* White background for input fields */
  border-radius: 8px;
}
.neumorphism-button,
.send-btn {
  color: green; /* Green button text matching the mockup */
  background-color: #fff;
  border-radius: 5px;
}

.neumorphism-button:hover,
.send-btn:hover {
  background-color: #e0e0e0; /* Slightly darker on hover */
}
.v-checkbox .v-icon {
  color: green; /* Green checkbox icon */
}

.v-checkbox .v-label {
  color: white; /* White text for privacy policy */
}
.v-col {
  margin-bottom: 16px; /* Add some spacing between fields */
}

.fill-height {
  height: 100vh;
}
.fixed-top {
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: white; /* Ensure background stays consistent */
}

.scrollable-list {
  overflow-y: auto;
  max-height: calc(100vh - 110px); /* Adjusted height to allow scrolling */
}

.v-row {
  width: 100%;
}
</style>
