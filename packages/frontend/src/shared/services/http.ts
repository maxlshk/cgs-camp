import axios from 'axios';
import { Todo } from '../services/types';

const API_URL = 'http://localhost:3030/api';

export const getTodos = async (): Promise<Todo[]> => {
	console.log('getting todos');
	const response = await axios.get(`${API_URL}/todos/all`);
	return response.data;
};

export const addTodo = async (todo: Omit<Todo, 'id'>): Promise<Todo> => {
	const response = await axios.post(`${API_URL}/todos`, todo);
	return response.data;
};

export const updateTodo = async (
	id: number,
	updates: Partial<Omit<Todo, 'id'>>,
): Promise<Todo> => {
	const response = await axios.put(`${API_URL}/todos/${id}`, updates);
	return response.data;
};

export const deleteTodo = async (id: number): Promise<void> => {
	await axios.delete(`${API_URL}/todos/${id}`);
};
