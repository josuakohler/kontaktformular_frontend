// stores/message.store.ts
import { defineStore } from "pinia";
import axios from "axios";
import { Message } from "../types/message";

export const useMessageStore = defineStore("messageStore", {
  state: () => ({
    messages: [] as Message[],
  }),
  actions: {
    async fetchMessages() {
      try {
        const response = await axios.get<Message[]>(
          "http://localhost:8000/messages"
        );
        this.messages = response.data;
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    },
    async createMessage(message: Omit<Message, "id">) {
      try {
        const response = await axios.post<Message>(
          "http://localhost:8000/messages",
          message
        );
        this.messages.push(response.data);
      } catch (error) {
        console.error("Error creating message:", error);
      }
    },
    async deleteMessage(id: number) {
      try {
        await axios.delete(`http://localhost:8000/messages/${id}`);
        this.messages = this.messages.filter((message) => message.id !== id);
      } catch (error) {
        console.error("Error deleting message:", error);
      }
    },

    async updateMessage(id: number, message: String) {
      try {
        await axios.put(`http://localhost:8000/messages/${id}`, {
          message: message,
        });
      } catch (error) {
        console.error("Error updating Message:", error);
      }
    },
  },
});
