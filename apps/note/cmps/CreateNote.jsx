const { useNavigate } = ReactRouterDOM
const { useState, useRef } = React

import { noteService } from "../services/note.service.js"

export function CreateNote({ loadNotes }) {

    const [noteType, setNoteType] = useState('NoteTxt')
    const [newNote, setNewNote] = useState(noteService.getEmptyNote('', '', false, '#fff', noteType))
    const [isExpanded, setIsExpanded] = useState(false)
    const [imgSrc, setImgSrc] = useState(null)
    const [newTodo, setNewTodo] = useState('')

    const inputRef = useRef(null)
    const navigate = useNavigate()

    function handleFileChange(ev) {
        const file = ev.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                setImgSrc(e.target.result)
                setNewNote(prevNote => ({
                    ...prevNote,
                    type: 'NoteImg',
                    info: {
                        ...prevNote.info,
                        imgSrc: e.target.result
                    }
                }))
            }
            reader.readAsDataURL(file)
        }
    }

    function handleImageButtonClick() {
        setNoteType('NoteImg')
        inputRef.current.click()
    }

    function handleTodoChange(ev) {
        setNewTodo(ev.target.value)
    }


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
        const noteToSave = { ...newNote }

        if (noteType === 'NoteImg' && imgSrc) {
            noteToSave.info.imgSrc = imgSrc || noteToSave.info.imgSrc
        }

        if (noteType === 'NoteTodos') {
            // noteToSave.info.todos = newNote.info.todos
        } 

        noteService.save(noteToSave)
            .then(note => {
                setNewNote(noteService.getEmptyNote('', '', false, '#fff', 'NoteTxt'))
                setImgSrc(null)
                loadNotes()
                setIsExpanded(false)
                navigate('/note')
            })
            .catch(err => {
                navigate('/note')
            })
    }

    const { info } = newNote
    const { title, txt, todos } = info

    const isValid = title.trim() || txt.trim() || imgSrc

    return (
        <section className="create-note">
            <input
                type="file"
                ref={inputRef}
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleFileChange}
            />
            <form
                onSubmit={onSaveNote}
                onClick={() => {
                    if (!isExpanded) setIsExpanded(true)
                }}
            >
                {noteType === 'NoteImg' && imgSrc && (
                    <div className="input-image">
                        <img src={imgSrc} alt="Uploaded Image" />
                    </div>
                )}

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
                            <button onClick={handleImageButtonClick} className="btn-note">
                                <img src="assets/img/google-material-icons/image.svg" alt="New note with image" />
                            </button>
                        </div>
                    )}
                </div>
                    {/* todos */}

                {isExpanded && (
                    <div className="expanded-buttons">
                        <button className="btn-note">
                            <img src="assets/img/google-material-icons/palette.svg" alt="background-color-button" />
                        </button>
                    </div>
                )}

                {isExpanded && (
                    <button type="submit" className="create-btn">Close</button>
                )}
            </form>
        </section>
    )
}