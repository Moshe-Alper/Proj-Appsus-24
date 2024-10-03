const { useEffect, useState } = React

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
            })
            .catch(err => {
                console.log('Problem removing note:', err)
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
            <NoteList
                onRemoveNote={onRemoveNote}
                notes={notes} 
                />
        </section>
    )
}
