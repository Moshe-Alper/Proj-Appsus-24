export function NoteSidebar() {

    return (
        <section className="note-sidebar">
            <ul className="sidebar-list">
            <li><button className="btn-sidebar"><img src="assets/img/google-material-icons/lightbulb.svg" alt="notes-button" /></button></li>
            <li><button className="btn-sidebar"><img src="assets/img/google-material-icons/notifications.svg" alt="reminders-button" /></button></li>
            <li><button className="btn-sidebar"><img src="assets/img/google-material-icons/label.svg" alt="new-button" /></button></li>
            <li><button className="btn-sidebar"><img src="assets/img/google-material-icons/edit.svg" alt="edit-labels-button" /></button></li>
            <li><button className="btn-sidebar"><img src="assets/img/google-material-icons/archive.svg" alt="archive-button" /></button></li>
            <li><button className="btn-sidebar"><img src="assets/img/google-material-icons/delete.svg" alt="trash-button" /></button></li>
            </ul>
        </section>
    )
}