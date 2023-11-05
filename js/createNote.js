const notesDOM = document.querySelector('.notes__list');

function createNote(e) {
  e.preventDefault();
  let noteTitle = document.querySelector();
  let newNote = document.createElement('li');
  newNote.classList.add(`notes__list-item ${e.priority}-priority`);
  newNote.innerHTML = `
    <h3 class="note__title">${e.title}</h3>
    <p class="note__date">${e.date}</p>
    <p class="note__content">
      ${e.content}
    </p>
    `;
}

const confirmBtn = document.querySelector('.confirm__icon');
confirmBtn.addEventListener('click', (e) => createNote(e));

const prioritySelectors = document.querySelectorAll('.form-priority__btn');
let selectedPriority;
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
