import { marked } from 'marked';
import { notesList } from './index.js';
import { updateLocalStorage } from './updateLocalStorage.js';

// marked.use({
//   gfm: true,
//   breaks: true,
// });

let unsavedContent = null;
export function configureNoteModal(modal) {
  let saveBtn = modal.querySelector('.modal__save-btn');
  let exitBtn = modal.querySelector('.modal__exit-btn');
  let deleteBtn = modal.querySelector('.modal__delete-btn');
  let modalContent = modal.querySelector('.modal__note-content');
  modalContent.addEventListener('focusin', (e) => {
    e.stopPropagation();
    enterEditMode(modal);
  });
  modalContent.addEventListener('focusout', (e) => {
    e.stopPropagation();
    exitEditMode(modal);
  });

  saveBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    unsavedContent ? saveModalContent(modal) : null;

    exitModal(modal);
  });
  exitBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    exitModal(modal);
  });
  deleteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    exitModal(modal);
    deleteNote(modal.parentElement);
  });
}

function enterEditMode(modal) {
  console.log('entrei em edit mode');
  const modalContent = modal.querySelector('.modal__note-content');
  console.log(modalContent.innerHTML);
  if (unsavedContent) {
    console.log(unsavedContent);
    modalContent.innerHTML = `${unsavedContent}`;
    return null;
  }
  const noteLi = modal.parentElement;
  const noteLiTitle = noteLi.querySelector('.note__title');
  const noteItem = notesList.find(
    (note) => note.title == noteLiTitle.textContent
  );
  modalContent.innerHTML = `${noteItem.content}`;
}

function exitEditMode(modal) {
  console.log('exiting edit mode');
  const modalContent = modal.querySelector('.modal__note-content');
  unsavedContent = modalContent.innerText;
  console.log('unsavedContent: ', unsavedContent);
  let newModalContent = marked.parse(unsavedContent);
  console.log('newModalContent: ', newModalContent);
  modalContent.innerHTML = newModalContent;
}

function saveModalContent(modal) {
  let newTitle = modal.querySelector('.modal__note-title').textContent;

  const noteLi = modal.parentElement;
  let noteTitle = noteLi.querySelector('.note__title');

  let noteItem = notesList.find((note) => note.title == noteTitle.textContent);
  if (noteItem) {
    noteItem.title = newTitle;
    noteItem.content = unsavedContent;
  }

  noteTitle.textContent = newTitle;
  let noteContent = noteLi.querySelector('.note__content');
  noteContent.innerHTML = marked.parse(unsavedContent);
  unsavedContent = null;
  updateLocalStorage();
}

function deleteNote(li) {
  let noteTitle = li.querySelector('.note__title');
  notesList = notesList.filter((note) => note.title != noteTitle.textContent);
  li.remove();
  updateLocalStorage();
}

export function exitModal(modal) {
  const noteLi = modal.parentElement;
  const noteTitle = noteLi.querySelector('.note__title');
  let noteItem = notesList.find((note) => note.title == noteTitle.textContent);

  if (noteItem.content !== unsavedContent) {
    modal.querySelector('.modal__note-content').innerHTML = marked.parse(
      noteItem.content
    );
  }
  modal.classList.remove('note__modal--open');
  unsavedContent = null;
}
