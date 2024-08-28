// login.store.ts
import { defineStore } from 'pinia';
import axios from 'axios';

interface LoginState {
  isAuthenticated: boolean;
  token: string | null;
  error: string | null;
}

export const useLoginStore = defineStore('login', {
  state: (): LoginState => ({
    isAuthenticated: false,
    token: null,
    error: null,
  }),
  actions: {
    async login(username: string, password: string) {
      try {
        const response = await axios.post('http://localhost:8000/users/login', { username, password });
        this.token = response.data.access_token;
        this.isAuthenticated = true;
        this.error = null;
      } catch (error) {
        this.error = 'Invalid credentials';
        this.isAuthenticated = false;
        this.token = null;
      }
    },
    logout() {
      this.isAuthenticated = false;
      this.token = null;
      this.error = null;
    },
  },
});