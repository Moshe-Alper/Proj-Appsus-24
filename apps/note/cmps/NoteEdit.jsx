const { useNavigate } = ReactRouterDOM

import { noteService } from "../services/note.service.js"

const { useState } = React

export function NoteEdit({ toggleEditModal }) {
    
    const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())
    const navigate = useNavigate()

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }
        setNoteToEdit(prevNote => ({ ...prevNote, [field]: value }))
    }

    function onSaveNote(ev) {
        ev.preventDefault()
        noteService.save(noteToEdit)
            .then(note => {
                navigate('/note')
            })
            .catch(err => {
                console.log('err:', err)
                navigate('/note')
            })
            .finally(() => {
                navigate('/note')

            })
        toggleEditModal()
    }

    const { title, publishedDate } = noteToEdit

    return (
        <section className="note-edit">
            <form onSubmit={onSaveNote} className="note-form">
                <div className="edit-modal">
                <input value={title} onChange={handleChange} type="text" name="title" id="title" />
                <button>Save</button>
                </div>
            </form>
        </section>
    )
}