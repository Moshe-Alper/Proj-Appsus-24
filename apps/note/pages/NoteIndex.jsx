const { useEffect, useState, Fragment } = React
const { Outlet, Link, useSearchParams } = ReactRouterDOM

import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { KeepHeader } from "../cmps/KeepHeader.jsx"
import { NoteList } from "../cmps/NoteList.jsx"
import { noteService } from "../services/note.service.js"
import { getTruthyValues } from "../../../services/util.service.js"
import { NoteSidebar } from "../cmps/NoteSidebar.jsx"
import { CreateNote } from "../cmps/CreateNote.jsx"
import { NoteSearch } from "../cmps/NoteSearch.jsx"

export function NoteIndex() {
    const [notes, setNotes] = useState(null)
    const [searchPrms, setSearchPrms] = useSearchParams()
    const [filterBy, setFilterBy] = useState(noteService.getFilterFromSearchParams(searchPrms))
    const [isFiltering, setIsFiltering] = useState(false)

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
                showSuccessMsg('Note trashed')
            })
            .catch(err => {
                console.log('Problem removing note:', err)
                showErrorMsg('Problem removing note')
            })
    }

    function onDuplicateNote(note) {
        noteService.duplicate(note)
            .then(duplicatedNote => {
                setNotes(prevNotes => [duplicatedNote, ...prevNotes])
                showSuccessMsg('Note Duplicated')
            })
            .catch(err => {
                console.error('Error duplicating note:', err)
                showErrorMsg('Problem duplicating note')
            })
    }

    function onSetFilterBy(filterBy) {
        setFilterBy({ ...filterBy })
    }

    function onTogglePin(noteId) {
        const note = notes.find(note => note.id === noteId)
        if (!note) return

        const updatedNote = { ...note, isPinned: !note.isPinned }

        noteService.save(updatedNote)
            .then(() => {
                setNotes(notes => notes.map(n => (n.id === noteId ? updatedNote : n)))
                showSuccessMsg(`Note ${updatedNote.isPinned ? 'pinned' : 'unpinned'}`)
            })
            .catch(err => {
                console.log('Problem toggling pin:', err)
                showErrorMsg('Problem pinning/unpinning note')
            })
    }
    

    if (!notes) return <h1>Loading...</h1>
    
    return (
        <section className="note-index">
            <KeepHeader
                filterBy={filterBy}
                onSetFilterBy={onSetFilterBy}
                setIsFiltering={setIsFiltering}
            />
            <main className="note-container">
                <NoteSidebar />

                {!isFiltering ? (
                    <Fragment>
                        <CreateNote loadNotes={loadNotes} />
                        {notes.length === 0 ? (
                            <div className="no-notes-msg">
                                <img src="../assets/img/google-material-icons/lightbulb.svg" alt="lightbulb image" />
                                <h1>Notes will appear here</h1>
                            </div>
                        ) : (
                            <NoteList
                                onRemoveNote={onRemoveNote}
                                notes={notes}
                                loadNotes={loadNotes}
                                togglePin={onTogglePin}
                                onDuplicateNote={onDuplicateNote}
                            />
                        )}
                    </Fragment>
                ) : (
                <NoteSearch
                onSetFilterBy={onSetFilterBy}
                setIsFiltering={setIsFiltering} 
                /> 
                )}
            </main>
        </section>
    )
}
