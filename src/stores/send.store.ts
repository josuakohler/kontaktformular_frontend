import { defineStore } from 'pinia'
import axios from 'axios'

interface State {
  firstName: string
  lastName: string
  email: string
  message: string
  status: string
  error: string
}

export const useSendMessageStore = defineStore('sendMessage', {
  state: (): State => ({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    status: '',
    error: '',
  }),
  
  actions: {
    async sendMessage() {
      try {
        const response = await axios.post('http://localhost:8000/contact/send-message', {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          message: this.message,
        })

        this.status = response.data.status
        this.error = ''
      } catch (error) {
        this.handleError(error, 'sending the message')
      }
    },

    async replyMessage() {
      try {
        const response = await axios.post('http://localhost:8000/contact/reply-message', {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          message: this.message,
        })

        this.status = response.data.status
        this.error = ''
      } catch (error) {
        this.handleError(error, 'sending the reply')
      }
    },

    handleError(error: unknown, action: string) {
      if (axios.isAxiosError(error)) {
        this.error = error.response?.data?.message || `An error occurred while ${action}.`
      } else if (error instanceof Error) {
        this.error = error.message
      } else {
        this.error = 'An unexpected error occurred.'
      }
      this.status = ''
    },

    resetForm() {
      this.firstName = ''
      this.lastName = ''
      this.email = ''
      this.message = ''
      this.status = ''
      this.error = ''
    },
  },

  getters: {
    isFormValid(): boolean {
      return !!(this.firstName && this.lastName && this.email && this.message)
    },
  },
})