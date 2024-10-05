const { useState } = React

export function CreateNote({ note, handleChange, onSaveNote }) {
    // console.log('note:', note)

    return <section className="create-note">
        <form>
            <input 
            type="text" 
            placeholder="Title" 
            name="txt"
            />
            <p>
                <textarea 
                name="content" 
                placeholder="Take a note..."
                ></textarea>
            </p>
            <button className="create-btn" onSubmit={onSaveNote}>Close</button>
    </form>
    </section>
}