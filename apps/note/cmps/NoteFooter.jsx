import { noteActionsSvg } from "../../../cmps/Svgs.jsx"


export function NoteFooter({
    note, onRemoveNote, onToggleStyleModal, onDuplicateNote
}) {

    return (
        <div className="note-footer">
            <button className="btn-note">
                {noteActionsSvg.shareSvg}
            </button>

            <button className="btn-note" onClick={() => onRemoveNote(note.id)}>
                {noteActionsSvg.removeSvg}
            </button>

            <button className="btn-note" onClick={() => onDuplicateNote(note)}>
                {noteActionsSvg.duplicateSvg}
            </button>
            
            <button className="btn-note" onClick={onToggleStyleModal}>
                {noteActionsSvg.paletteSvg}
            </button>

        </div>
    )
}