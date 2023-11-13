import { notesList } from './index.js';
import { updateLocalStorage } from './updateLocalStorage.js';

export function configureNoteModal(modal) {
  let saveBtn = modal.querySelector('.modal__save-btn');
  let exitBtn = modal.querySelector('.modal__exit-btn');
  let deleteBtn = modal.querySelector('.modal__delete-btn');

  saveBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    saveModalContent(modal);
    exitModal(modal);
  });
  exitBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    exitModal(modal);
  });
  deleteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    deleteNote(modal.parentElement);
    exitModal(modal);
  });
}

function saveModalContent(modal) {
  let newTitle = modal.querySelector('.modal__note-title').textContent;
  let newContent = modal.querySelector('.modal__note-content').textContent;

  const noteLi = modal.parentElement;
  let noteTitle = noteLi.querySelector('.note__title');

  let noteItem = notesList.find((note) => note.title == noteTitle.textContent);
  if (noteItem) {
    noteItem.title = newTitle;
    noteItem.content = newContent;
  }

  noteTitle.textContent = newTitle;
  let noteContent = noteLi.querySelector('.note__content');
  noteContent.textContent = newContent;
  updateLocalStorage();
}

function deleteNote(li) {
  let noteTitle = li.querySelector('.note__title');
  notesList = notesList.filter((note) => note.title != noteTitle.textContent);
  li.remove();
  updateLocalStorage();
}

function exitModal(modal) {
  const noteLi = modal.parentElement;
  const noteContent = noteLi.querySelector('.note__content');
  const noteModalContent = modal.querySelector('.modal__note-content');
  noteModalContent.textContent !== noteContent.textContent
    ? (noteModalContent.textContent = noteContent.textContent)
    : null;
  modal.classList.remove('note__modal--open');
}
