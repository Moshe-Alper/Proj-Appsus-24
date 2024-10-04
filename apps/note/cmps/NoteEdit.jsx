const { useNavigate, useParams } = ReactRouterDOM

import { noteService } from "../services/note.service.js"
import { AddNote } from "./AddNote.jsx"
import { ColorInput } from "./ColorInput.jsx"
import { NoteImg } from "./dynamic-note-type/NoteImg.jsx"
import { NoteTodos } from "./dynamic-note-type/NoteTodos.jsx"
import { NoteTxt } from "./dynamic-note-type/NoteTxt.jsx"

const { useState, useEffect } = React

export function NoteEdit({ toggleEditModal, refreshNotes }) {

    const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())
    const { noteId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (noteId) loadNote()
    }, [])

    function loadNote() {
        noteService.get(noteId)
            .then(setNoteToEdit)
            .catch(err => {
                console.log('Problem getting note:', err)
                navigate('/note')
            })
    }

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
        setNoteToEdit(prevNote => ({
            ...prevNote,
            info: {
                ...prevNote.info,
                [field]: value
            }
        }))
    }

    function onSaveNote(ev) {
        ev.preventDefault()
        noteService.save(noteToEdit)
            .then(note => {
                toggleEditModal()
                refreshNotes()
                navigate('/note')
            })
            .catch(err => {
                console.log('err:', err)
                navigate('/note')
            })
            .finally(() => {
                navigate('/note')
            })
    }

    if (!noteToEdit) return <p>Loading...</p>
    return (
        <section className="note-section">
            {noteToEdit.id ? (
                // This is the edit form
                <section className="note-edit">
                    <h1>Edit Note</h1>
                    <form onSubmit={onSaveNote} className="note-form">
                        <div className="edit-modal">
                            <DynamicCmp type={noteToEdit.type} info={noteToEdit.info} />
                            <button>Save</button>
                            <button type="button" onClick={() => setNoteToEdit(null)}>Close</button>
                        </div>
                    </form>
                </section>
            ) : (
                // This is the add form
                <AddNote
                    handleChange={handleChange}
                />
            )}
        </section>
    )

    function DynamicCmp({ type, info }) {
        switch (type) {
            case 'NoteTxt':
                return <NoteTxt
                    info={info}
                    onChangeInfo={handleChange}
                />
            case 'NoteImg':
                return <NoteImg info={info} />
            case 'NoteTodos':
                return <NoteTodos info={info} />
            default:
                return <p>Loading...</p>
        }
    }

}