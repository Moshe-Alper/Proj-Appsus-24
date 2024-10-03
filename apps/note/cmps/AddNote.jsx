export function AddNote() {

    function onSaveNote(ev) {
        ev.preventDefault()
        console.log('Saving Note');
    }

    return (
        <section className="add-note">
            <form onSubmit={onSaveNote}>
            <input 
            placeholder="Title"
            type="text" 
            name="txt"
            className="note-title-input"
            />
            <input 
            placeholder="Take a note..."
            type="text" 
            name="txt"
            className="note-content-input"
            />
            <div className="note-action">
                <button>A</button>
                <button>🖼️</button>
                <button>▶️</button>
                <button>≔</button>
                <button>🔉</button>
                <button>✏️</button>
            <button>Close</button>
            </div>
            </form>
        </section>
    )
}
