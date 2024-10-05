const { useState } = React
const { useNavigate } = ReactRouterDOM


export function AddNote({ title, children }) {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    const openClass = isOpen ? 'open' : ''

    function onSaveNote(ev) {
        ev.preventDefault()
        // navigate('/note')
        console.log('Saving Note')
    }

    return (
        <section className={`add-note ${openClass}`}>
            <section onClick={() => setIsOpen(isOpen => !isOpen)} className="title-container" >
                <h2>{title}</h2>
                <div className="add-note-actions">
                    <button className="btn-note"><img src="assets/img/google-material-icons/check_box.svg" alt="add list" /></button>
                    <button className="btn-note"><img src="assets/img/google-material-icons/brush.svg" alt="add note drawing" /></button>
                    <button className="btn-note"><img src="assets/img/google-material-icons/image.svg" alt="add note image" /></button>
                </div>
                <span className="arrow">⌄</span>
                <section className="content">
                    <p>
                        {children}
                    </p>
                </section>
            </section>

        </section>
    )
}
