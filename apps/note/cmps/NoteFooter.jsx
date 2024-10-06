const { Link } = ReactRouterDOM

export function NoteFooter({ note, onRemoveNote, onToggleEditModal, onToggleStyleModal }) {

    return (
        <div className="note-footer">

            <button className="btn-note" onClick={() => onRemoveNote(note.id)}>
            <img src="assets/img/google-material-icons/delete.svg" alt="trash-button" />
            </button  >
            <Link to={`/note/${note.id}`}>
                <button className="btn-note" onClick={onToggleEditModal}>
                <img src="assets/img/google-material-icons/edit.svg" alt="edit-button" />
                </button>
            </Link>
            <button className="btn-note" onClick={onToggleStyleModal}>
            <img src="assets/img/google-material-icons/palette.svg" alt="background-color-button" />
            </button>
        </div>
    )
}