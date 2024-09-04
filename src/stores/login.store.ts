import { defineStore } from "pinia";
import axios from "axios";

interface LoginState {
  isAuthenticated: boolean;
  token: string | null;
  error: string | null;
}

export const useLoginStore = defineStore('login', {
  state: (): LoginState => ({
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
    token: localStorage.getItem('token'),
    error: null,
  }),
  actions: {
    async login(username: string, password: string) {
      try {
        const response = await axios.post('http://localhost:8000/users/login', { username, password });
        this.token = response.data.access_token;
        this.isAuthenticated = true;
        this.error = null;

        // Save to localStorage
        if (this.token) {
          localStorage.setItem('token', this.token);
        }
        localStorage.setItem('isAuthenticated', 'true');
      } catch (error) {
        this.error = 'Invalid credentials';
        this.isAuthenticated = false;
        this.token = null;

        // Clear localStorage
        localStorage.removeItem('token');
        localStorage.setItem('isAuthenticated', 'false');
      }
    },
    logout() {
      this.isAuthenticated = false;
      this.token = null;
      this.error = null;

      // Clear localStorage
      localStorage.removeItem('token');
      localStorage.setItem('isAuthenticated', 'false');
    },
  },
});
