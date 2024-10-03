import { NotePreview } from "./NotePreview.jsx";

export function NoteList({ notes, onRemoveNote, refreshNotes }) {
    return (
        <ul className="note-list">
            {notes.map(note =>
                <li key={note.id}>
                    <NotePreview 
                    onRemoveNote={onRemoveNote}
                    note={note}
                    refreshNotes={refreshNotes}
                    />
                </li>)}
        </ul>
    )
}
