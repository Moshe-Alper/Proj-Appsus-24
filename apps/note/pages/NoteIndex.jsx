const { useEffect, useState } = React

import { NoteList } from "../cmps/NoteList.jsx"
import { noteService } from "../services/note.service.js"

export function NoteIndex() {

    const [notes, setNotes] = useState(null)

    useEffect(() => {
        noteService.query()
            .then(setNotes)
            .catch(err => {
                console.log('Problem getting note:', err)
            })
    }, [])

    function onRemoveNote(noteId) {
        noteService.remove(noteId)
            .then(() => {
                setNotes(notes => notes.filter(note => note.id !== noteId))
            })
            .catch(err => {
                console.log('Problem removing note:', err)
            })
    }

    if (!notes) return <h1>Loading...</h1>
    return (
        <section className="note-index">
            <NoteList
                onRemoveNote={onRemoveNote}
                notes={notes} />
        </section>
    )
}
