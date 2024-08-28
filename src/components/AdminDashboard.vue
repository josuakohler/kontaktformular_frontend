<template>
  <v-container>
    <v-card
      v-for="msg in message.messages"
      :key="msg.id"
      :title="`${msg.firstname} ${msg.lastname} ${msg.id}`"
      :subtitle="msg.mail"
      class="mb-4"
    >
      <v-card-text v-if="editingMessageId !== msg.id">
        {{ msg.message }}
      </v-card-text>
      <v-text-field
        v-else
        v-model="editedMessage"
        label="Edit message"
        @keyup.enter="saveEdit(msg.id)"
      ></v-text-field>

      <v-card-actions>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn color="primary" v-bind="props"> Actions </v-btn>
          </template>
          <v-list>
            <v-list-item @click="startEdit(msg.id, msg.message)">
              <v-list-item-title>{{
                editingMessageId === msg.id ? "Save" : "Edit"
              }}</v-list-item-title>
            </v-list-item>
            <v-list-item @click="openDeleteDialog(msg.id)">
              <v-list-item-title>Delete</v-list-item-title>
            </v-list-item>
            <v-list-item @click="respondToMessage(msg.id)">
              <v-list-item-title>Respond</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-card-actions>
    </v-card>

    <v-dialog v-model="deleteDialog" max-width="400" persistent>
      <v-card title="Delete message?">
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="deleteDialog = false">Cancel</v-btn>
          <v-btn @click="deleteMessage" color="red">
            Delete {{ selectedMessageId }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-btn @click="handleLogout">Log out</v-btn>
  </v-container>
</template>

<script setup lang="ts">
import { useLoginStore } from "../stores/login.store";
import { useRouter } from "vue-router";
import { useMessageStore } from "../stores/message.store";
import { onMounted, ref } from "vue";

const loginStore = useLoginStore();
const router = useRouter();
const message = useMessageStore();
const deleteDialog = ref(false);
const selectedMessageId = ref<number | null>(null);
const editingMessageId = ref<number | null>(null);
const editedMessage = ref("");

onMounted(() => {
  message.fetchMessages();
});

const openDeleteDialog = (id: number) => {
  selectedMessageId.value = id;
  deleteDialog.value = true;
};

const deleteMessage = () => {
  if (selectedMessageId.value !== null) {
    message.deleteMessage(selectedMessageId.value);
    deleteDialog.value = false;
    selectedMessageId.value = null;
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
  const index = message.messages.findIndex((msg) => msg.id === id);

  if (index !== -1) {
    message.messages[index].message = editedMessage.value;
    message.updateMessage(id, editedMessage.value);

    console.log(id);
  }
  editingMessageId.value = null;
  editedMessage.value = "";
};

const respondToMessage = (id: number) => {
  // Implement respond functionality
  console.log(`Respond to message ${id}`);
};

const handleLogout = () => {
  loginStore.logout();
  router.push("/");
};
</script>
