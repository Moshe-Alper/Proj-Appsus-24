import { NoteFilter } from "../cmps/NoteFilter.jsx"

export function NoteHeader({ filterBy, onSetFilterBy }) {
    return <header className="note-header">
        <div className="logo">
        <button className="btn-header"><img src="assets/img/google-material-icons/menu.svg" alt="menu"/></button>
            <img src="assets/img/keep-logo.png" alt="logo image" className="keep-logo" />
            <h1>Keep</h1>
        </div>
        <NoteFilter 
            filterBy={filterBy} 
            onSetFilterBy={onSetFilterBy}
            />
        <div className="actions">
            <button className="btn-header"><img src="assets/img/google-material-icons/refresh.svg" alt="refresh"/></button>
            <button className="btn-header"><img src="assets/img/google-material-icons/view_agenda.svg" alt="view"/></button>
            <button className="btn-header"><img src="assets/img/google-material-icons/settings.svg" alt="settings"/></button>

        </div>
        <div className="google-actions">
        <button className="btn-header"><img src="assets/img/google-material-icons/apps.svg" alt="apps"/></button>
        <button className="btn-header"><img src="assets/img/google-material-icons/account_circle.svg" alt="account"/></button>
        </div>
    </header>
}