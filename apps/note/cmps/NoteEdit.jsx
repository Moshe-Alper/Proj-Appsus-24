const { useNavigate, useParams } = ReactRouterDOM
const { useState, useEffect, useRef, Fragment } = React


import { noteService } from "../services/note.service.js"
import { NoteImg } from "./dynamic-note-type/NoteImg.jsx"
import { NoteTodos } from "./dynamic-note-type/NoteTodos.jsx"
import { NoteTxt } from "./dynamic-note-type/NoteTxt.jsx"
import { AppLoader } from "../../../cmps/AppLoader.jsx"
import { NoteVideo } from "./dynamic-note-type/NoteVideo.jsx"


export function NoteEdit({ toggleEditModal, loadNotes }) {

    const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())
    const { noteId } = useParams()
    const navigate = useNavigate()
    const [isPinned, setIsPinned] = useState(false)
    const inputRef = useRef(null)
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        if (noteId) loadNote()
    }, [])

    function loadNote() {
        setIsLoading(true)
        noteService.get(noteId)
            .then(setNoteToEdit)
            .catch(err => {
                console.log('Problem getting note:', err)
                navigate('/note')
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

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
                break;
        }

        setNoteToEdit(prevNote => ({
            ...prevNote,
            info: {
                ...prevNote.info,
                [field]: value
            }
        }))
    }

    function handleTodoChange(idx, text) {
        const newTodos = noteToEdit.info.todos.map((todo, i) =>
            i === idx ? { ...todo, txt: text } : todo
        )

        setNoteToEdit(prevNote => ({
            ...prevNote,
            info: {
                ...prevNote.info,
                todos: newTodos
            }
        }))
    }


    function onSaveNote(ev) {
        ev.preventDefault()
        noteService.save(noteToEdit)
            .then(note => {
                toggleEditModal()
                loadNotes()
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

    function onTogglePin(ev) {
        ev.stopPropagation()
        setIsPinned((prevState) => !prevState)

        setNoteToEdit((prevNote) => ({
            ...prevNote,
            isPinned: !prevNote.isPinned,
        }))
    }

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, [noteToEdit.info.title])

    return (
        <Fragment>
            <div className="loading-overlay" style={{ display: isLoading ? 'block' : 'none' }}>
                <AppLoader />
            </div>
            <section className="editing-section" style={{ display: isLoading ? 'none' : 'block' }}>
                <form onSubmit={onSaveNote} className="editing-section-form" style={{ backgroundColor: noteToEdit.style.backgroundColor }}>                <header className="editing-header">
                    <input
                        autoFocus
                        ref={inputRef}
                        placeholder="Title"
                        name="title"
                        value={noteToEdit.info.title}
                        onChange={handleChange}
                        type="text" />

                    <button type="button" onClick={onTogglePin} className="btn-note">
                        <img
                            src={`assets/img/google-material-icons/${noteToEdit.isPinned ? 'pin' : 'pin_nofill'}.svg`}
                            alt={isPinned ? "unpin" : "pin"}
                        />
                    </button>

                </header>
                    <DynamicCmp type={noteToEdit.type} info={noteToEdit.info} />
                    <div className="editing-footer">

                        <button>Close</button>
                    </div>
                </form>
            </section>
        </Fragment>

    )

    function DynamicCmp({ type, info }) {
        switch (type) {
            case 'NoteTxt':
                return <NoteTxt
                    info={info}
                    onChangeInfo={handleChange}
                    onToggleEditModal={toggleEditModal}
                />
            case 'NoteImg':
                return <NoteImg
                    info={info}
                    onChangeInfo={handleChange}
                    onToggleEditModal={toggleEditModal}
                />
            case 'NoteTodos':
                return <NoteTodos
                    info={info}
                    onChangeInfo={handleTodoChange}
                    onToggleEditModal={toggleEditModal}
                />
            case 'NoteVideo':
                return <NoteVideo
                    info={info}
                    onChangeInfo={handleTodoChange}
                    onToggleEditModal={toggleEditModal}
                />
            default:
                return <p>Loading...</p>
        }
    }

}