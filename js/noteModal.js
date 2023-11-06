import { notesList } from './getNotes.js';

const notes = document.querySelectorAll('.notes__list-item');

notes.forEach((note) => {
  let noteModal = note.querySelector('.note__modal');
  note.addEventListener('click', () => {
    noteModal.style.display = 'block';
  });
});
