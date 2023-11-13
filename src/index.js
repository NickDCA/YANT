import '../styles/style.scss';
import { configureNoteModal } from './configureNoteModal.js';
import { formModal, selectedPriority } from './createNoteForm.js';

let notesList =
  localStorage.length > 0 ? JSON.parse(localStorage.getItem('notes')) : [];

console.table(notesList);

function getNotes() {
  const notesUl = document.querySelector('.notes__list');
  if (notesList.length > 0) {
    notesList.forEach((note) => {
      let noteLi = document.createElement('li');
      noteLi.classList.add('notes__list-item', `${note.priority}-priority`);
      let noteContent = note.content;
      noteLi.innerHTML = `
      <h3 class="note__title">${note.title}</h3>
        <p class="note__date">${note.date}</p>
        <p class="note__content">${noteContent}</p>
        <div class="note__modal">
          <div class="modal__content">
            <h3 contenteditable="true" class="modal__note-title">${note.title}</h3>
            <p contenteditable="true" class="modal__note-content">${noteContent}</p>
            <div class="modal__btn">
              <button class="modal__exit-btn">Exit</button>
              <button class="modal__delete-btn">Delete</button>
              <button class="modal__save-btn">Save 📝</button>
            </div>
          </div>
        </div>`;

      let noteModal = noteLi.lastChild;
      noteLi.addEventListener('click', () => {
        noteModal.classList.add('note__modal--open');
      });

      configureNoteModal(noteModal);
      notesUl.appendChild(noteLi);
    });
  } else {
    return alert(
      'No notes to be showed, please create one by clicking on the add button ;)'
    );
  }
}

getNotes();

// CREATION OF NEW NOTES

window.onclick = function (event) {
  let noteModal = document.querySelector('.note__modal--open')
    ? document.querySelector('.note__modal--open')
    : null;

  if (noteModal && event.target == noteModal) {
    noteModal.classList.remove('note__modal--open');
    //noteSelected = null;
  }
  if (event.target == formModal) {
    formModal.classList.remove('form__modal--open');
  }
};

export { configureNoteModal, notesList, selectedPriority };
