const { Link } = ReactRouterDOM

export function NoteHeader({ note, togglePin, onToggleEditModal }) {
    const { info, isPinned } = note
    const { title } = info

    function onPinClick(ev) {
        ev.stopPropagation()
        togglePin(note.id)
    }

    return (
        
        <Link to={`/note/${note.id}`}>
        <header className="note-header" onClick={() => onToggleEditModal(note.id)}>
            <h1>{title}</h1>
            <button onClick={onPinClick} className="btn-note">
                <img
                    src={`assets/img/google-material-icons/${isPinned ? 'pin' : 'pin_nofill'}.svg`}
                    alt={isPinned ? "unpin" : "pin"}
                />
            </button>
        </header>
        </Link>
    )
}