import { NoteImg } from "./dynamic-note-type/NoteImg.jsx";
import { NoteTodos } from "./dynamic-note-type/NoteTodos.jsx";
import { NoteTxt } from "./dynamic-note-type/NoteTxt.jsx";

export function NotePreview({ note }) {
    console.log('note:', note)

    return (
        <article className="note-preview">
            <DynamicCmp type={note.type} info={note.info} />
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