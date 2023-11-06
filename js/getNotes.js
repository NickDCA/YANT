const notesList =
  localStorage.length > 0 ? JSON.parse(localStorage.getItem('notes')) : [];

console.table(notesList);

let noteSelected = null;

function getNotes() {
  const notesUl = document.querySelector('.notes__list');
  if (notesList.length > 0) {
    notesList.forEach((note) => {
      let newNoteLi = document.createElement('li');
      newNoteLi.classList.add('notes__list-item', `${note.priority}-priority`);
      newNoteLi.innerHTML = `
      <h3 class="note__title">${note.title}</h3>
        <p class="note__date">${note.date}</p>
        <p class="note__content">
          ${note.content}
        </p>
        <div class="note__modal">
          <div class="modal__content">
            <input type="text" class="modal__note-title" placeholder=${note.title} />
            <textarea
              name="modal__content"
              id="modal__note-content"
              placeholder=${note.content}
              rows="10"
            ></textarea>
            <div class="modal__btn">
              <button class="modal__exit-btn">Exit</button>
              <button class="modal__save-btn">Save 📝</button>
            </div>
          </div>
        </div>`;

      let noteModal = newNoteLi.lastChild;
      newNoteLi.addEventListener('click', () => {
        noteModal.classList.add('note__modal--open');
        noteSelected = newNoteLi;
      });

      notesUl.appendChild(newNoteLi);
    });
  } else {
    return alert(
      'No notes to be showed, please create one by clicking on the add button ;)'
    );
  }
}

window.onclick = function (event) {
  let noteModal = noteSelected.lastChild;
  if (event.target == noteModal) {
    noteModal.classList.remove('note__modal--open');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  getNotes();
});

export { notesList };
