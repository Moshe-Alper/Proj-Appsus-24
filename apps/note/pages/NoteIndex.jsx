const { useEffect, useState } = React
const { Outlet, Link, useSearchParams } = ReactRouterDOM

import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { NoteHeader } from "../cmps/NoteHeader.jsx"
import { NoteList } from "../cmps/NoteList.jsx"
import { noteService } from "../services/note.service.js"
import { getTruthyValues } from "../../../services/util.service.js"
import { NoteSidebar } from "../cmps/NoteSidebar.jsx"

export function NoteIndex() {
    const [notes, setNotes] = useState(null)
    const [searchPrms, setSearchPrms ] = useSearchParams()
    const [filterBy, setFilterBy ] = useState(noteService.getFilterFromSearchParams(searchPrms))

    useEffect(() => {
        loadNotes()
        setSearchPrms(getTruthyValues(filterBy))
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
            <NoteHeader 
            filterBy={filterBy} 
            onSetFilterBy={onSetFilterBy}
            />
            <main className="note-container">
            <Link to="/note/edit"><h1>Add Note</h1></Link>
            <Outlet />
            <NoteSidebar />
            <NoteList
                onRemoveNote={onRemoveNote}
                notes={notes} 
                refreshNotes={loadNotes}
                />
            </main>
        </section>
    )
}
