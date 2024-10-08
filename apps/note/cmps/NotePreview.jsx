const { useState, useEffect } = React

import { noteService } from "../services/note.service.js"
import { ColorInput } from "./ColorInput.jsx"
import { NoteImg } from "./dynamic-note-type/NoteImg.jsx"
import { NoteTodos } from "./dynamic-note-type/NoteTodos.jsx"
import { NoteTxt } from "./dynamic-note-type/NoteTxt.jsx"
import { NoteFooter } from "./NoteFooter.jsx"
import { NoteEdit } from "./NoteEdit.jsx";
import { NoteHeader } from "./NoteHeader.jsx"

export function NotePreview({
    note, onRemoveNote, refreshNotes, togglePinNote, onDuplicateNote
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
        setNoteStyle(prevStyle => ({ ...prevStyle, ...newStyle }));

        const updatedNote = {
            ...note,
            style: {
                ...note.style,
                ...newStyle
            }
        };

        noteService.save(updatedNote)
            .then(() => {
                console.log('New note color:', updatedNote.style.backgroundColor)
                onToggleStyleModal()
            })
            .catch(err => console.log('Error saving note style:', err));
    }

    return (
        <article style={{ ...noteStyle }} className="note-preview">
            <NoteHeader
                togglePinNote={togglePinNote}
                note={note}
            />
            <DynamicCmp type={note.type} info={note.info} />
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
                    refreshNotes={refreshNotes}
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
                return <NoteTxt info={info} />
            case 'NoteImg':
                return <NoteImg info={info} />
            case 'NoteTodos':
                return <NoteTodos info={info} />
            default:
                return <p>Unknown note type</p>
        }
    }
}