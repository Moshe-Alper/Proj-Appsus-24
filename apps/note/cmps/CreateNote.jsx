const { useNavigate } = ReactRouterDOM
const { useState, Fragment } = React

import { noteService } from "../services/note.service.js"

export function CreateNote({ loadNotes }) {

    const [newNote, setNewNote] = useState(noteService.getEmptyNote())
    const [isExpanded, setIsExpanded] = useState(false)
    const [noteType, setNoteType] = useState('NoteTxt')

    const navigate = useNavigate()

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break

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

        if (!isValid) {
            setIsExpanded(false)
            return
        }

        noteService.save(newNote)
            .then(note => {
                console.log('Success adding note:', note)
                setNewNote(noteService.getEmptyNote())
                loadNotes()
                setIsExpanded(false)
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

    const { info } = newNote
    const { title, txt } = info

    const isValid = title.trim() || txt.trim()
    return (
        <section className="create-note">
            <form
                onSubmit={onSaveNote}
                onClick={() => {
                    if (!isExpanded) setIsExpanded(true)
                }}
            >
                {isExpanded && (
                    <div className="input-title">
                        <input
                            value={title}
                            type="text"
                            placeholder="Title"
                            name="title"
                            onChange={handleChange}
                        />
                    </div>
                )}


                <div className="note-text-container">
                    <p className="note-text">
                        <textarea
                            value={txt}
                            name="txt"
                            placeholder="Take a note..."
                            onChange={handleChange}
                        ></textarea>
                    </p>

                    {!isExpanded && (
                        <div className="button-container">
                            <button onClick={() => setNoteType('NoteTodos')} className="btn-note">
                                <img src="assets/img/google-material-icons/check_box.svg" alt="New List" />
                            </button>
                            <button className="btn-note">
                                <img src="assets/img/google-material-icons/brush.svg" alt="New note with drawing" />
                            </button>
                            <button onClick={() => setNoteType('NoteImg')} className="btn-note">
                                <img src="assets/img/google-material-icons/image.svg" alt="New note with image" />
                            </button>
                        </div>
                    )}
                </div>

                {isExpanded && (
                    <div className="expanded-buttons">
                        <button className="btn-note">
                            <img src="assets/img/google-material-icons/palette.svg" alt="background-color-button" />
                        </button>
                    </div>
                )}

                {isExpanded && (
                    <button type="submit" className="create-btn">Save</button>
                )}
            </form>
        </section>
    )
}