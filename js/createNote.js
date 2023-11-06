import { notesList } from './getNotes.js';
import { updateLocalStorage } from './updateLocalStorage.js';

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
  let newNoteLi = document.createElement('li');
  newNoteLi.classList.add('notes__list-item', `${notePriority}-priority`);
  newNoteLi.innerHTML = `
    <h3 class="note__title">${noteTitle}</h3>
    <p class="note__date">${noteDate}</p>
    <p class="note__content">
      ${noteContent}
    </p>
    `;

  let noteItem = {
    title: noteTitle,
    date: noteDate,
    content: noteContent,
    priority: notePriority,
  };

  notesList.push(noteItem);
  console.table(notesList);

  updateLocalStorage();
  console.log(newNoteLi);

  selectedPriority = null;

  window.location.href = '../index.html';
}
