import { NoteFilter } from "../cmps/NoteFilter.jsx"

export function NoteHeader({ filterBy, onSetFilterBy }) {
    return <header className="note-header">
        <h1>Google Keep Header</h1>
        <NoteFilter 
            filterBy={filterBy} 
            onSetFilterBy={onSetFilterBy}
            />
    </header>
}