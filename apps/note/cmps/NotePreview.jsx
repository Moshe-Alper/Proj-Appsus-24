const { useState, useEffect } = React

import { ColorInput } from "./ColorInput.jsx"
import { NoteImg } from "./dynamic-note-type/NoteImg.jsx"
import { NoteTodos } from "./dynamic-note-type/NoteTodos.jsx"
import { NoteTxt } from "./dynamic-note-type/NoteTxt.jsx"
import { NoteActions } from "./NoteActions.jsx"
import { NoteEdit } from "./NoteEdit.jsx";

export function NotePreview({ note, onRemoveNote, refreshNotes }) {
    const [isShowEditModal, setIsShowEditModal] = useState(false)

    const initialBackgroundColor = note.style.backgroundColor || '#fff'
    const [ noteStyle, setNoteStyle ] = useState({
        backgroundColor: initialBackgroundColor
    })

    // useEffect(() => {
    //     setTimeout(() => {
    //         onSetNoteStyle({ backgroundColor: 'red' })
    //     }, 2000)
    // }, [])

    
    function onToggleEditModal() {
        setIsShowEditModal((prevIsEditModal) => !prevIsEditModal)
    }

    function onSetNoteStyle(newStyle) {
        setNoteStyle(prevStyle => ({ ...prevStyle, ...newStyle }))
    }
    

    return (
        <article style={{ ...noteStyle }}  className="note-preview">
            <DynamicCmp type={note.type} info={note.info} />
                <NoteActions
                    note={note}
                    onRemoveNote={onRemoveNote}
                    onToggleEditModal={onToggleEditModal}
                    />
                {isShowEditModal && (
                    <NoteEdit
                    toggleEditModal={onToggleEditModal}
                    refreshNotes={refreshNotes}
                    />
                )}

                <ColorInput 
                onSetNoteStyle={onSetNoteStyle}
                { ...noteStyle }
                />
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