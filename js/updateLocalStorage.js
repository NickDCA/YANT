import { notesList } from './getNotes.js';

export function updateLocalStorage() {
  localStorage.setItem('notes', JSON.stringify(notesList));
}
