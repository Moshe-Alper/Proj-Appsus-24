export function NoteFooter({
    note, onRemoveNote, onToggleStyleModal, onDuplicateNote
}) {

    return (
        <div className="note-footer">

            <button className="btn-note" onClick={() => onRemoveNote(note.id)}>
                <img src="assets/img/google-material-icons/delete.svg" alt="trash-button" />
            </button  >

            <button className="btn-note" onClick={() => onDuplicateNote(note)}>
                <img src="assets/img/google-material-icons/duplicate.svg" alt="duplicate-button" />
            </button>
            
            <button className="btn-note" onClick={onToggleStyleModal}>
                <img src="assets/img/google-material-icons/palette.svg" alt="background-color-button" />
            </button>

        </div>
    )
}