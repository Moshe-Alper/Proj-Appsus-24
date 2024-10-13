const { Link } = ReactRouterDOM

import { MailFilter } from "../cmps/MailFilter.jsx"

export function MailHeader({ filterBy, onSetFilterBy }) {

    // console.log(filterBy)
    return <header className="mail-header">

        <Link to={`/mail`}>
            <div className="logo">
                <button className="btn-mail"><img src="assets/img/google-material-icons/menu.svg" alt="menu" /></button>
                <img src="assets/img/mails/mail-logo.png" alt="logo image" className="mail-logo" />
                <h1>Gmail</h1>
            </div>
        </Link>
        <MailFilter
            filterBy={filterBy}
            onSetFilterBy={onSetFilterBy}
        />
        <div className="actions">
            <button className="btn-mail"><img src="assets/img/google-material-icons/support.svg" alt="refresh" /></button>
            <button className="btn-mail"><img src="assets/img/google-material-icons/settings.svg" alt="settings" /></button>

        </div>
        <div className="google-actions">
            <button className="btn-mail"><img src="assets/img/google-material-icons/apps.svg" alt="apps" /></button>
            <button className="btn-mail"><img src="assets/img/google-material-icons/account_circle.svg" alt="account" /></button>
        </div>
    </header>
}