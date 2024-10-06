export function NotePreviewHeader ({ info }) {

    const { title } = info
    return (
        <header className="note-preview-header">
            <h1>{title}</h1>
            <button className="btn-note"><img src="assets/img/google-material-icons/pin_nofill.svg" alt="pin"/></button>
        </header>
    )
}