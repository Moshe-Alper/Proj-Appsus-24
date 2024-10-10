const { Link } = ReactRouterDOM


import { NoteFilter } from "../cmps/NoteFilter.jsx"

export function KeepHeader({ filterBy, onSetFilterBy, setIsFiltering, handleReset }) {
    return <header className="keep-header">


        <Link to={`/note`}>

            <div className="logo">
                <button className="btn-note"><img src="assets/img/google-material-icons/menu.svg" alt="menu" /></button>
                <img src="assets/img/notes/keep-logo.png" alt="logo image" className="keep-logo" />
                <h1>Keep</h1>
            </div>
        </Link>
        <NoteFilter
            filterBy={filterBy}
            onSetFilterBy={onSetFilterBy}
            setIsFiltering={setIsFiltering}
        />
        <div className="actions">
            <button className="btn-note"><img src="assets/img/google-material-icons/refresh.svg" alt="refresh" /></button>
            <button className="btn-note"><img src="assets/img/google-material-icons/view_agenda.svg" alt="view" /></button>
            <button className="btn-note"><img src="assets/img/google-material-icons/settings.svg" alt="settings" /></button>

        </div>
        <div className="google-actions">
            <button className="btn-note"><img src="assets/img/google-material-icons/apps.svg" alt="apps" /></button>
            <button className="btn-note"><img src="assets/img/google-material-icons/account_circle.svg" alt="account" /></button>
        </div>
    </header>
}