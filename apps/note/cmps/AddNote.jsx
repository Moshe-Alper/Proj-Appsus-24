const { useNavigate } = ReactRouterDOM


export function AddNote({ handleChange}) {
    const navigate = useNavigate()


    function onSaveNote(ev) {
        ev.preventDefault()
        navigate('/note')
        console.log('Saving Note')
    }

    return (
        <section className="add-note">
            <form onSubmit={onSaveNote}>
            <input 
            placeholder="Title"
            onChange={handleChange}
            type="text" 
            name="txt"
            className="note-title-input"
            />
            <textarea 
            placeholder="Take a note..."
            onChange={handleChange} 
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
