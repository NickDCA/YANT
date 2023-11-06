const notesList =
  localStorage.length > 0 ? JSON.parse(localStorage.getItem('notes')) : [];

console.table(notesList);

function getNotes() {
  const notesUl = document.querySelector('.notes__list');
  if (notesList.length > 0) {
    notesList.forEach((note) => {
      notesUl.innerHTML += `
        <li class="notes__list-item ${note.priority}-priority">
        <h3 class="note__title">${note.title}</h3>
        <p class="note__date">${note.date}</p>
        <p class="note__content">
          ${note.content}
        </p>
        `;
    });
  } else {
    return alert(
      'No notes to be showed, please create one by clicking on the add button ;)'
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  getNotes();
});

export { notesList };
