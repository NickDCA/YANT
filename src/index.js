import { updateLocalStorage } from './updateLocalStorage.js';

let notesList =
  localStorage.length > 0 ? JSON.parse(localStorage.getItem('notes')) : [];

console.table(notesList);

//let noteSelected = null;

function getNotes() {
  const notesUl = document.querySelector('.notes__list');
  if (notesList.length > 0) {
    notesList.forEach((note) => {
      let noteLi = document.createElement('li');
      noteLi.classList.add('notes__list-item', `${note.priority}-priority`);
      noteLi.innerHTML = `
      <h3 class="note__title">${note.title}</h3>
        <p class="note__date">${note.date}</p>
        <p class="note__content">
          ${note.content}
        </p>
        <div class="note__modal">
          <div class="modal__content">
            <h3 contenteditable="true" class="modal__note-title">${note.title}</h3>
            <p contenteditable="true" class="modal__note-content">${note.content}</p>
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

function configureNoteModal(modal) {
  let saveBtn = modal.querySelector('.modal__save-btn');
  let exitBtn = modal.querySelector('.modal__exit-btn');
  let deleteBtn = modal.querySelector('.modal__delete-btn');

  saveBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    saveModalContent(modal);
    exitModal(modal);
    //noteSelected = null;
  });
  exitBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    exitModal(modal);
    //noteSelected = null;
  });
  deleteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    deleteNote(modal.parentElement);
    exitModal(modal);
    //noteSelected = null;
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
  modal.classList.remove('note__modal--open');
}

window.onclick = function (event) {
  let noteModal = document.querySelector('.note__modal--open')
    ? document.querySelector('.note__modal--open')
    : null;
  let formModal = document.querySelector('.form__modal');

  if (noteModal && event.target == noteModal) {
    noteModal.classList.remove('note__modal--open');
    //noteSelected = null;
  }
  if (event.target == formModal) {
    formModal.classList.remove('form__modal--open');
  }
};

getNotes();

export { configureNoteModal, notesList };
