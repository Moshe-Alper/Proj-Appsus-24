export function NoteHeader({ note, togglePinNote }) {
    const { info, isPinned } = note
    const { title } = info
    return (
        <header className="note-header">
            <h1>{title}</h1>
            <button onClick={() => togglePinNote(note.id)}
                className="btn-note">
                <img
                    src={`assets/img/google-material-icons/${isPinned ? 'pin' : 'pin_nofill'}.svg`}
                    alt={isPinned ? "unpin" : "pin"}
                />
            </button>
        </header>
    )
}