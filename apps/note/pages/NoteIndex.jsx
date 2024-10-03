const { Outlet, Link } = ReactRouterDOM

const { useEffect, useState } = React

import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { AddNote } from "../cmps/AddNote.jsx"
import { NoteFilter } from "../cmps/NoteFilter.jsx"
import { NoteList } from "../cmps/NoteList.jsx"
import { noteService } from "../services/note.service.js"

export function NoteIndex() {

    const [notes, setNotes] = useState(null)
    const [filterBy, setFilterBy ] = useState(noteService.getDefaultFilter())

    useEffect(() => {
        loadNotes()
    }, [filterBy])

    function loadNotes() {
        noteService.query(filterBy)
        .then(setNotes)
        .catch(err => {
            console.log('Problem getting note:', err)
        })
    }

    function onRemoveNote(noteId) {
        noteService.remove(noteId)
            .then(() => {
                setNotes(notes => notes.filter(note => note.id !== noteId))
                showSuccessMsg('Note removed successfully')
            })
            .catch(err => {
                console.log('Problem removing note:', err)
                showErrorMsg('Problem removing note ${bookId}')
            })
    }

    function onSetFilterBy(filterBy) {
        setFilterBy({ ...filterBy })
    }

    if (!notes) return <h1>Loading...</h1>
    // console.log('notes:', notes)
    return (
        <section className="note-index">
            <NoteFilter 
            filterBy={filterBy} 
            onSetFilterBy={onSetFilterBy}
            />
            <Link to="/note/edit"><h1>Add Note</h1></Link>
            <Outlet />
            <NoteList
                onRemoveNote={onRemoveNote}
                notes={notes} 
                refreshNotes={loadNotes}
                />
        </section>
    )
}
