const { Link } = ReactRouterDOM
const { useState, useEffect } = React

import { noteService } from "../services/note.service.js"
import { ColorInput } from "./ColorInput.jsx"
import { NoteImg } from "./dynamic-note-type/NoteImg.jsx"
import { NoteTodos } from "./dynamic-note-type/NoteTodos.jsx"
import { NoteTxt } from "./dynamic-note-type/NoteTxt.jsx"
import { NoteFooter } from "./NoteFooter.jsx"
import { NoteEdit } from "./NoteEdit.jsx"
import { NoteHeader } from "./NoteHeader.jsx"

export function NotePreview({
    note, onRemoveNote, loadNotes, togglePin, onDuplicateNote
}) {
    const [isShowEditModal, setIsShowEditModal] = useState(false)
    const [isShowStyleModal, setIsShowStyleModal] = useState(false)

    const initialBackgroundColor = note.style.backgroundColor || '#fff'
    const [noteStyle, setNoteStyle] = useState({
        backgroundColor: initialBackgroundColor
    })

    function onToggleEditModal() {
        setIsShowEditModal((prevIsEditModal) => !prevIsEditModal)
    }

    function onToggleStyleModal() {
        setIsShowStyleModal((prevIsStyleModal) => !prevIsStyleModal)
    }

    function onSetNoteStyle(newStyle) {
        setNoteStyle(prevStyle => ({ ...prevStyle, ...newStyle }))

        const updatedNote = {
            ...note,
            style: {
                ...note.style,
                ...newStyle
            }

        }

        noteService.save(updatedNote)
            .then(() => {
                // console.log('New note color:', note.style.backgroundColor)
                loadNotes()

            })
            .catch(err => console.log('Error saving note style:', err))
    }

    return (
        <article style={{ ...noteStyle }} className="note-preview">
            <NoteHeader
                togglePin={togglePin}
                note={note}
                onToggleEditModal={onToggleEditModal}
            />

            <Link to={`/note/${note.id}`}>
                <DynamicCmp
                    type={note.type}
                    info={note.info}
                />
            </Link>

            <NoteFooter
                note={note}
                onRemoveNote={onRemoveNote}
                onDuplicateNote={onDuplicateNote}
                onToggleEditModal={onToggleEditModal}
                onToggleStyleModal={onToggleStyleModal}
            />
            {isShowEditModal && (
                <NoteEdit
                    toggleEditModal={onToggleEditModal}
                    loadNotes={loadNotes}
                />
            )}
            {isShowStyleModal && (
                <ColorInput
                    onSetNoteStyle={onSetNoteStyle}
                    onToggleStyleModal={onToggleStyleModal}
                    {...noteStyle}
                />
            )}
        </article>
    )

    function DynamicCmp({ type, info }) {
        switch (type) {
            case 'NoteTxt':
                return <NoteTxt
                    info={info}
                    id={note.id}
                    onToggleEditModal={onToggleEditModal}
                />
            case 'NoteImg':
                return <NoteImg
                    info={info}
                    id={note.id}
                    onToggleEditModal={onToggleEditModal}
                />
            case 'NoteTodos':
                return <NoteTodos 
                    info={info}
                    id={note.id}
                    onToggleEditModal={onToggleEditModal}
                />
            default:
                return <p>Unknown note type</p>
        }
    }
}