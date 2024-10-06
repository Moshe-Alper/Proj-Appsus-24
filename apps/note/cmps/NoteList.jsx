import { NotePreview } from "./NotePreview.jsx"


export function NoteList({ notes, onRemoveNote, refreshNotes, togglePinNote }) {
    const pinnedNotes = notes.filter(note => note.isPinned)
    const otherNotes = notes.filter(note => !note.isPinned)

    return (
        <section className="note-lists-container">
            {pinnedNotes.length > 0 && (
                <div className="pinned-section">
                    <h1 className="pinned-title">Pinned</h1>
                    <ul className="note-list pinned">
                        {pinnedNotes.map(note =>
                            <li key={note.id}>
                                <NotePreview
                                    onRemoveNote={onRemoveNote}
                                    note={note}
                                    refreshNotes={refreshNotes}
                                    togglePinNote={togglePinNote}
                                />
                            </li>)}
                    </ul>
                </div>
            )}

            {otherNotes.length > 0 && (
                <div className="other-section">
                    <h1 className="other-title">Pinned</h1>
                    <ul className="note-list">
                        {otherNotes.map(note =>
                            <li key={note.id}>
                                <NotePreview
                                    onRemoveNote={onRemoveNote}
                                    note={note}
                                    refreshNotes={refreshNotes}
                                    togglePinNote={togglePinNote}
                                />
                            </li>)}
                    </ul>
                </div>
            )}
        </section>
    )
}
