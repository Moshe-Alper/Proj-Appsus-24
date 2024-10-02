export function NotePreview( {note}) {


    const { type} = note
    return (
        <article className="note-preview">
            {type}
        </article>
    )

}