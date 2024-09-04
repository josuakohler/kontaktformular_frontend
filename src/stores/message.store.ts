// stores/message.store.ts
import { defineStore } from "pinia";
import axios from "axios";
import { Message } from "../types/message";

export const useMessageStore = defineStore("messageStore", {
  state: () => ({
    messages: [] as Message[],
    verificationStatus: "" as string,
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
        const response = await axios.post<{ status: string }>(
          "http://localhost:8000/messages",
          message
        );
        return response.data.status;  // Hier wird die Statusnachricht zurückgegeben, die den Benutzer über die gesendete Verifizierungs-E-Mail informiert.
      } catch (error) {
        console.error("Error creating message:", error);
        throw error;
      }
    },

    async verifyEmail(token: string) {
      try {
        const response = await axios.get<{ status: string }>(
          `http://localhost:8000/messages/verify/${token}`
        );
        this.verificationStatus = response.data.status;
        
        // Nach erfolgreicher Verifizierung die Nachrichtenliste neu laden
        if (this.verificationStatus === 'Message has been successfully verified and saved.') {
          await this.fetchMessages();
        }
        
        return this.verificationStatus;
      } catch (error) {
        console.error("Error verifying email:", error);
        this.verificationStatus = "Fehler bei der E-Mail-Verifizierung";
        throw error;
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
