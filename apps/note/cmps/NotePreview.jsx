const { Link, useNavigate } = ReactRouterDOM
const { useState, useEffect } = React

import { noteService } from "../services/note.service.js"
import { ColorInput } from "./ColorInput.jsx"
import { NoteImg } from "./dynamic-note-type/NoteImg.jsx"
import { NoteTodos } from "./dynamic-note-type/NoteTodos.jsx"
import { NoteTxt } from "./dynamic-note-type/NoteTxt.jsx"
import { NoteFooter } from "./NoteFooter.jsx"
import { NoteEdit } from "./NoteEdit.jsx"
import { NoteHeader } from "./NoteHeader.jsx"
import { NoteVideo } from "./dynamic-note-type/NoteVideo.jsx"
import { NoteLabels } from "./NoteLabels.jsx"

export function NotePreview({ note, onRemoveNote, loadNotes, togglePin, onDuplicateNote }) {
    const navigate = useNavigate()

    const [isShowEditModal, setIsShowEditModal] = useState(false)
    const [isShowStyleModal, setIsShowStyleModal] = useState(false)

    const [isEmailReady, setIsEmailReady] = useState(false)


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

    function onUpdateNoteTodos(updatedTodos) {
        const updatedNote = {
            ...note,
            info: {
                ...note.info,
                todos: updatedTodos
            }
        }

        noteService.save(updatedNote)
            .then(() => loadNotes())
            .catch(err => console.log('Error updating todos:', err))
    }

    function sendAsEmail() {

        const subject = note.info.title || 'My Note'
        let body = note.info.txt || ''

        if (note.type === 'NoteImg' && note.info.imgSrc) {
            body += `\n\nImage: ${note.info.imgSrc}`
        } else if (note.type === 'NoteVideo' && note.info.videoSrc) {
            body += `\n\nWatch Video: ${note.info.videoSrc}`
        } else if (note.type === 'NoteTodos' && note.info.todos) {
            body += '\n\nTodos:\n'
            note.info.todos.forEach((todo, idx) => {
                body += `${idx + 1}. ${todo.txt} - ${todo.done ? 'DONE' : 'NOT DONE'}\n`
            })
        }

        const encodedBody = encodeURIComponent(body)

        navigate('/mail/compose', { state: { subject, body } })

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
            <NoteLabels
                createdAt={note.createdAt}
            />
            <NoteFooter
                note={note}
                onRemoveNote={onRemoveNote}
                onDuplicateNote={onDuplicateNote}
                onToggleEditModal={onToggleEditModal}
                onToggleStyleModal={onToggleStyleModal}
                sendAsEmail={sendAsEmail}
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
                    onChangeInfo={onUpdateNoteTodos}
                />
            case 'NoteVideo':
                return <NoteVideo
                    info={info}
                    id={note.id}
                    onToggleEditModal={onToggleEditModal}
                />
            default:
                return <p>Unknown note type</p>
        }
    }
}