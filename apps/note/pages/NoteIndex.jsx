const { useEffect, useState } = React

import { NoteList } from "../cmps/NoteList.jsx"
import { noteService } from "../services/note.service.js"

export function NoteIndex() {

    const [notes, setNotes] = useState(null)

    useEffect(() => {
        noteService.query()
            .then(setNotes)
    }, [])

    if (!notes) return <h1>Loading...</h1>
    console.log('notes:', notes)
    return (
        <section className="note-index">
            <NoteList notes={notes} />
        </section>
    )
}
