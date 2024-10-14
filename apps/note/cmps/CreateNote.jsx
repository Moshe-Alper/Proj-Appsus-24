const { useNavigate } = ReactRouterDOM
const { useState, useRef } = React

import { noteService } from "../services/note.service.js"
import { createNoteSvgs, videoSvg } from "../../../cmps/Svgs.jsx"


export function CreateNote({ loadNotes }) {

    const [noteType, setNoteType] = useState('NoteTxt')
    const [newNote, setNewNote] = useState(noteService.getEmptyNote('', '', false, '#fff', noteType))
    const [isExpanded, setIsExpanded] = useState(false)
    const [imgSrc, setImgSrc] = useState(null)
    const [videoSrc, setVideoSrc] = useState(null)
    const [isPinned, setIsPinned] = useState(false)
    const [todos, setTodos] = useState([])
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

    function handleVideoButtonClick() {
        setNoteType('NoteVideo')
    }

    function handleAddTodo() {
        const updatedTodos = [...todos, { txt: '', doneAt: null }]
        setTodos(updatedTodos)

        setNewNote(prevNote => ({
            ...prevNote,
            type: 'NoteTodos',
            info: {
                ...prevNote.info,
                todos: updatedTodos
            }
        }))
    }

    function handleTodoChange(idx, value) {
        const updatedTodos = [...todos]
        updatedTodos[idx].txt = value
        setTodos(updatedTodos)
    }

    function toggleTodoDone(idx) {
        const updatedTodos = [...todos]
        updatedTodos[idx].doneAt = updatedTodos[idx].doneAt ? null : Date.now()
        setTodos(updatedTodos)
    }

    function onTogglePin(ev) {
        ev.stopPropagation()
        setIsPinned(prevState => !prevState)
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
        console.log('newNote:', newNote)
        let noteToSave = { ...newNote, isPinned }

        if (noteType === 'NoteImg' && imgSrc) {
            noteToSave.info.imgSrc = imgSrc || noteToSave.info.imgSrc
        }

        if (noteType === 'NoteVideo' && videoSrc) {
            noteToSave.info.videoSrc = videoSrc || noteToSave.info.videoSrc
        }
        
        if (noteType === 'NoteTodos') {
            noteToSave.info.todos = todos
        }
        

        noteService.save(noteToSave)
            .then(note => {
                setNewNote(noteService.getEmptyNote('', '', false, '#fff', 'NoteTxt'))
                setImgSrc(null)
                setVideoSrc(null)
                setTodos([])
                loadNotes()
                setIsExpanded(false)
                navigate('/note')
            })
            .catch(err => {
                navigate('/note')
            })
            .finally(() => {
                setNoteType('NoteTxt')
            })
    }
    // console.log('newNote:', newNote)
    const { info } = newNote
    const { title, txt } = info

    const isValid = title.trim() || txt.trim() || imgSrc || videoSrc || todos.length > 0
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

                {noteType === 'NoteVideo' && isExpanded && (
                    <div className="input-video-url">
                        <input
                            type="text"
                            value={videoSrc || ''}
                            placeholder="Enter video URL..."
                            onChange={(ev) => {
                                setVideoSrc(ev.target.value)
                                setNewNote(prevNote => ({
                                    ...prevNote,
                                    type: 'NoteVideo',
                                    info: {
                                        ...prevNote.info,
                                        videoSrc: ev.target.value
                                    }
                                }))
                            }}
                        />
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
                        <button type="button" onClick={onTogglePin} className="btn-note">
                            <img
                                src={`assets/img/google-material-icons/${isPinned ? 'pin' : 'pin_nofill'}.svg`}
                                alt={isPinned ? "unpin" : "pin"}
                            />
                        </button>
                    </div>
                )}

                <div className="note-contracted-container">
                    {!isExpanded || (isExpanded && noteType !== 'NoteTodos') ? (
                        <div className="note-text-container">
                            <textarea
                                value={txt}
                                name="txt"
                                placeholder="Take a note..."
                                onChange={handleChange}
                            ></textarea>
                        </div>
                    ) : null}

                    {!isExpanded && (
                        <div className="button-container">
                            <button onClick={() => setNoteType('NoteTodos')} className="btn-note">
                                {createNoteSvgs.checkboxSvg}
                            </button>
                            <button onClick={handleVideoButtonClick} className="btn-note">
                                {createNoteSvgs.videoSvg}
                            </button>
                            <button onClick={handleImageButtonClick} className="btn-note">
                                {createNoteSvgs.imgSvg}
                            </button>
                        </div>
                    )}

                </div>
                {isExpanded && noteType === 'NoteTodos' && (
                    <div className="todos-container">
                        {todos.map((todo, idx) => (
                            <div key={idx} className="todo-item">
                                <input
                                    type="checkbox"
                                    checked={!!todo.doneAt}
                                    onChange={() => toggleTodoDone(idx)}
                                />
                                <input
                                    type="text"
                                    value={todo.txt}
                                    onChange={(ev) => handleTodoChange(idx, ev.target.value)}
                                    placeholder="Todo..."
                                />
                            </div>
                        ))}
                        <button type="button" onClick={handleAddTodo} className="btn-add-todo">
                            + List item
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