const { Link } = ReactRouterDOM
const { useState } = React

import { NoteImg } from "./dynamic-note-type/NoteImg.jsx";
import { NoteTodos } from "./dynamic-note-type/NoteTodos.jsx";
import { NoteTxt } from "./dynamic-note-type/NoteTxt.jsx";
import { NoteEdit } from "./NoteEdit.jsx";

export function NotePreview({ note, onRemoveNote }) {
    // console.log('note:', note)
    const [isShowEditModal, setIsShowEditModal] = useState()

    function onToggleEditModal() {
        setIsShowEditModal((prevIsEditModal) => !prevIsEditModal)
    }

    return (
        <article className="note-preview">
            <DynamicCmp type={note.type} info={note.info} />
            <div className="note-footer">
                {/* Create note-actions comp */}
                <button onClick={() => onRemoveNote(note.id)}>Delete</button>
                <Link to={`/note/${note.id}`}><button onClick={onToggleEditModal}>Edit</button></Link>
                {isShowEditModal && (
                    <NoteEdit 
                    toggleEditModal={onToggleEditModal}

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