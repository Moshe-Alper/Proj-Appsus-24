// const { Link } = ReactRouterDOM
const { useParams, useNavigate, Link, useSearchParams, Outlet } = ReactRouterDOM

import { MailPreview } from "./MailPreview.jsx";


export function MailList({ mails,setMails }) {
    const { mailId } = useParams()
    console.log(setMails)

    return (

        <React.Fragment>
            {!mailId ? (
                <ul className='mail-list'>
                    {mails.map((mail) => (
                        <li key={mail.id}>
                            <Link to={`/mail/${mail.id}`}>
                                <MailPreview
                                    mail={mail}
                                />
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <Outlet context={{ setMails }} />
            )}
        </React.Fragment>
    )

}
