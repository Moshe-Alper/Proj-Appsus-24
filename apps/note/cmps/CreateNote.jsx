const { useNavigate } = ReactRouterDOM
const { useState } = React

import { noteService } from "../services/note.service.js"

export function CreateNote({ refreshNotes }) {

    const [newNote, setNewNote] = useState(noteService.getEmptyNote())
    const navigate = useNavigate()


    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }
        setNewNote(prevValue => ({
            ...prevValue,
            info: {
                ...prevValue.info,
                [field]: value
            }
        }))
    }

    function onSaveNote(ev) {
        ev.preventDefault()

        noteService.save(newNote)
            .then(note => {
                console.log('Success adding note:', note)
                setNewNote(noteService.getEmptyNote())
                refreshNotes()
                navigate('/note')
            })
            .catch(err => {
                console.log('err:', err)
                navigate('/note')
            })
            .finally(() => {
                navigate('/note')
            })
    }

    // console.log('newNote:', newNote)
    const { info } = newNote
    const { txt, content } = info
    return <section className="create-note">
        <form onSubmit={onSaveNote}>
            <input
                value={txt}
                type="text"
                placeholder="Title"
                name="txt"
                onChange={handleChange}
            />
            <p>
                <textarea
                    value={content}
                    name="content"
                    placeholder="Take a note..."
                    onChange={handleChange}
                ></textarea>
            </p>
            <button className="create-btn">Close</button>
        </form>
    </section>
}