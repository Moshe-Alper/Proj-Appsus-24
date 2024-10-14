// const { Link } = ReactRouterDOM
const { useEffect, useState } = React
const { useParams, useNavigate, Link, useSearchParams, Outlet } = ReactRouterDOM


import { MailPreview } from "./MailPreview.jsx";

export function MailList({ mails, setMails, counts, updateCounts, onRemoveMail, filterBy, onSetFilterBy }) {

    const { mailId } = useParams()
    const [hoveredMailId, setHoveredMailId] = useState(null)
    const [filterByToEdit, setFilterByToEdit] = useState({ filterBy })

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    useEffect(() => {
        updateCounts(counts)
    }, [counts])

    function onReadMail(isRead, mailId) {
        setMails(prevMails =>
            prevMails.map(mail =>
                mail.id === mailId ? { ...mail, isRead } : mail
            )
        )
    }
    
    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    return (

        <React.Fragment>
            {!mailId ? (

                <ul className='mail-list'>
                    <div className="checkbox-wrapper">
                        <input
                            id="checkbox"
                            type="checkbox"
                            name="isRead"
                            checked={filterByToEdit.isRead}
                            onChange={handleChange}
                        />
                        <label htmlFor="checkbox">Show Read Mails</label>
                    </div>
                    {mails.map((mail) => (
                        <li key={mail.id} className={mail.isRead ? 'read' : 'unread'}>
                            <div className="mail-content"
                                onMouseEnter={() => setHoveredMailId(mail.id)} // Set hovered mail ID
                                onMouseLeave={() => setHoveredMailId(null)} // Reset on mouse leave
                            >
                                <Link to={`/mail/${mail.id}`}>
                                    <MailPreview
                                        mail={mail} showDelete={hoveredMailId === mail.id}
                                    />
                                </Link>
                                {hoveredMailId === mail.id && (
                                    <div className="btn-container">
                                        <button onClick={() => onRemoveMail(mail.id)} className="btn-delete">
                                            <img src="assets/img/google-material-icons/delete.svg" alt="delete" />
                                        </button>

                                        {mail.isRead ? (
                                            <button onClick={() => onReadMail(false, mail.id)} className="btn-read">
                                                <img src="assets/img/google-material-icons/read_mail.svg" alt="Mark as Unread" />
                                            </button>
                                        ) : (
                                            <button onClick={() => onReadMail(true, mail.id)} className="btn-read">
                                                <img src="assets/img/google-material-icons/unread_mail.svg" alt="Mark as Read" />
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <Outlet context={{ mails, setMails }} />
            )}
        </React.Fragment>
    )

}
