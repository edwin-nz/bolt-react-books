import axios from 'axios';
import { Book } from '../types/book';

const api = axios.create({
  baseURL: 'https://api.books_list',
});

export const setAuthToken = (token: string) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const removeAuthToken = () => {
  delete api.defaults.headers.common['Authorization'];
};

export const fetchBooks = async (): Promise<Book[]> => {
  const response = await api.get<Book[]>('/books');
  return response.data;
};

export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data.token;
};