const { Link } = ReactRouterDOM

export function NoteActions({ note, onRemoveNote, onToggleEditModal }) {

    return (
        <div className="note-actions">
            <button onClick={() => onRemoveNote(note.id)}>Delete</button>
            <Link to={`/note/${note.id}`}>
                <button onClick={onToggleEditModal}>Edit</button>
            </Link>
            <button>Background Color</button>
        </div>
    )
}