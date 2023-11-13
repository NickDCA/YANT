import { createNote } from './createNote';

const newNoteBtn = document.querySelector('.notes__add-btn');
export const formModal = document.querySelector('.form__modal');
export let selectedPriority = null;
const prioritySelectors = document.querySelectorAll('.form-priority__btn');

prioritySelectors.forEach((btn) => {
  btn.addEventListener('click', (e) => handlePrioritySelection(e, btn));
});

newNoteBtn.addEventListener('click', (e) => {
  formModal.classList.add('form__modal--open');
  clearPriority(prioritySelectors);
});

function clearPriority(prioritySelectors) {
  prioritySelectors.forEach((selector) => {
    selector.classList.remove('form-priority__btn--selected');
  });
}
function handlePrioritySelection(e, btn) {
  e.preventDefault();
  if (selectedPriority) {
    selectedPriority.classList.remove('form-priority__btn--selected');
  }

  selectedPriority = document.getElementById(btn.id);
  selectedPriority.classList.add('form-priority__btn--selected');
}

// CONFIRM THEN CREATE NOTE
const confirmBtn = document.querySelector('.confirm__icon');
confirmBtn.addEventListener('click', (e) => {
  createNote(e, selectedPriority);
  formModal.classList.remove('form__modal--open');
});
