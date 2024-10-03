const { useState } = React

import { NoteImg } from "./dynamic-note-type/NoteImg.jsx"
import { NoteTodos } from "./dynamic-note-type/NoteTodos.jsx"
import { NoteTxt } from "./dynamic-note-type/NoteTxt.jsx"
import { NoteActions } from "./NoteActions.jsx"
import { NoteEdit } from "./NoteEdit.jsx";

export function NotePreview({ note, onRemoveNote, refreshNotes }) {
    // console.log('note:', note)
    const [isShowEditModal, setIsShowEditModal] = useState(false)

    function onToggleEditModal() {
        setIsShowEditModal((prevIsEditModal) => !prevIsEditModal)
    }

    return (
        <article className="note-preview">
            <DynamicCmp type={note.type} info={note.info} />
            <div className="note-footer">
                {/* Create note-actions comp */}
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

            </div>
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