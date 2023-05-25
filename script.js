const notesWrapper = document.getElementById('notesWrapper')
const textArea = document.querySelector('textarea')
const noteForm = document.querySelector('.note-form')
const saveNoteBtn = document.getElementById('saveNoteBtn')

const notesList = JSON.parse(localStorage.getItem('notes') || '[]');

const editIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
<path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
<path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
</svg>
`

const deleteIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
<path d="M2 3a1 1 0 00-1 1v1a1 1 0 001 1h16a1 1 0 001-1V4a1 1 0 00-1-1H2z" />
<path fill-rule="evenodd" d="M2 7.5h16l-.811 7.71a2 2 0 01-1.99 1.79H4.802a2 2 0 01-1.99-1.79L2 7.5zm5.22 1.72a.75.75 0 011.06 0L10 10.94l1.72-1.72a.75.75 0 111.06 1.06L11.06 12l1.72 1.72a.75.75 0 11-1.06 1.06L10 13.06l-1.72 1.72a.75.75 0 01-1.06-1.06L8.94 12l-1.72-1.72a.75.75 0 010-1.06z" clip-rule="evenodd" />
</svg>
`


function openForm() {
	noteForm.classList.remove('hidden')
	textArea.focus()
}

function addNote() {
	textArea.value = ''
	openForm()
}

function updateNotesList() {
	localStorage.setItem('notes', JSON.stringify(notesList))
}

function saveNote(event) {
	event.preventDefault()
	let text = textArea.value;
	let index = localStorage.getItem('index') || ''
		if(index) {
			notesList.splice(index, 1, text)
			updateNotesList()
			localStorage.removeItem('index')
		}
		else if(text) {
			notesList.push(text)
			updateNotesList()
		}
	noteForm.classList.add('hidden')
	renderNotes()
}

function deleteNote(index) {
	notesList.splice(index, 1)
	updateNotesList()
	renderNotes()
}

function editNote(index) {
	textArea.value = notesList[index]
	openForm()
	localStorage.setItem('index', index)
}

function renderNotes() {
	if (!notesList.length) {
		addNote()
	}
	else {
		notesWrapper.innerHTML = `<ol></ol>`;
		notesList.forEach((note, index) => {
			let noteElement = `<li>
				<div class="note-header">
					<button type="button" onClick="editNote(${index})" aria-label="edit">
						${editIcon}
					</button>
					<button type="button" onClick="deleteNote(${index})" aria-label="delete">${deleteIcon}</button>
				</div>
				<div class="note-body">
					<p>${note}</p>
				</div>
			</li>`

			document.querySelector('ol').innerHTML += noteElement
		})
	}
}

noteForm.addEventListener("focusout", saveNote)

saveNoteBtn.addEventListener('click', saveNote)

renderNotes()