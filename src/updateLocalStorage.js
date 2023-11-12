import { notesList } from './index.js';

export function updateLocalStorage() {
  localStorage.setItem('notes', JSON.stringify(notesList));
}
