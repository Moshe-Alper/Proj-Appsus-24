// const { Link } = ReactRouterDOM
const { useParams, useNavigate, Link, useSearchParams, Outlet } = ReactRouterDOM
const { useEffect, useState } = React

import { MailPreview } from "./MailPreview.jsx";


export function MailList({ mails, setMails, counts, updateCounts }) {

    const [countsToEdit, setCountsToEdit] = useState(counts)
    const { mailId } = useParams()
    console.log(countsToEdit,'counts on list')

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
                        </li>
                    ))}
                </ul>
            ) : (
                <Outlet context={{ mails, setMails }} />
            )}
        </React.Fragment>
    )

}
