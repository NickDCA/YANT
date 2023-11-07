import { configureModal, noteSelected, notesList } from './getNotes.js';
import { updateLocalStorage } from './updateLocalStorage.js';

// OPENING THE FORM MODAL
const newNoteBtn = document.querySelector('.notes__add-btn');
const formModal = document.querySelector('.form__modal');
newNoteBtn.addEventListener('click', (e) => {
  formModal.classList.add('form__modal--open');
});

// HANDLE PRIORITY
const prioritySelectors = document.querySelectorAll('.form-priority__btn');
let selectedPriority = null;
prioritySelectors.forEach((btn) => {
  btn.addEventListener('click', (e) => handlePrioritySelection(e, btn));
});

function handlePrioritySelection(e, btn) {
  e.preventDefault();
  if (selectedPriority) {
    selectedPriority.classList.remove('form-priority__btn--selected');
  }

  selectedPriority = document.getElementById(btn.id);
  selectedPriority.classList.add('form-priority__btn--selected');
}

// CREATION OF NEW NOTES

const confirmBtn = document.querySelector('.confirm__icon');
confirmBtn.addEventListener('click', (e) => createNote(e));

function createNote(e) {
  e.preventDefault();
  let noteTitle = document.querySelector('.title-input').value;
  let noteContent = document.querySelector('#note-content').value;
  let notePriority = selectedPriority ? selectedPriority.id : 'blank';
  let currentDate = new Date();
  let cDay = currentDate.getDate();
  let cMonth = currentDate.getMonth() + 1;
  let cYear = currentDate.getFullYear();
  let noteDate = `${cDay} ${cMonth} ${cYear}`;
  let noteLi = document.createElement('li');
  noteLi.classList.add('notes__list-item', `${notePriority}-priority`);
  noteLi.innerHTML = `
    <h3 class="note__title">${noteTitle}</h3>
    <p class="note__date">${noteDate}</p>
    <p class="note__content">
      ${noteContent}
    </p>
    <div class="note__modal">
      <div class="modal__content">
        <h3 contenteditable="true" class="modal__note-title">${noteTitle}</h3>
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

  configureModal(noteModal);

  let noteItem = {
    title: noteTitle,
    date: noteDate,
    content: noteContent,
    priority: notePriority,
  };

  let notesUl = document.querySelector('.notes__list');
  notesUl.appendChild(noteLi);
  notesList.push(noteItem);
  console.table(notesList);

  updateLocalStorage();
  // console.log(newNoteLi);

  selectedPriority = null;
  document.querySelector('.title-input').value = '';
  document.querySelector('#note-content').value = '';

  formModal.classList.remove('form__modal--open');
  window.location.reload();
}
