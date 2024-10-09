// const { Link } = ReactRouterDOM
const { useEffect, useState } = React
const { useParams, useNavigate, Link, useOutletContext } = ReactRouterDOM


import { MailPreview } from "./MailPreview.jsx";

export function MailList({ mails, setMails, counts, updateCounts, onRemoveMail }) {

    const [countsToEdit, setCountsToEdit] = useState(counts)
    const { mailId } = useParams()

    useEffect(() => {
        updateCounts(counts)
    }, [mails])

    return (

        <React.Fragment>
            {!mailId ? (
                <ul className='mail-list'>
                    {mails.map((mail) => (
                        <li key={mail.id} className={mail.isRead ? 'read' : 'unread'}>
                            <Link to={`/mail/${mail.id}`}>
                                <MailPreview
                                    mail={mail}
                                />
                            </Link>
                            <button onClick={() => onRemoveMail(mail.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <Outlet context={{ mails, setMails }} />
            )}
        </React.Fragment>
    )

}
