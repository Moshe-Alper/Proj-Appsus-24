const { Link } = ReactRouterDOM
import { MailPreview } from "./MailPreview.jsx";

export function MailList({ mails }) {

    return (
        <ul className="mail-list">
            {mails.map(mail => {
                const isReadClass = mail.isRead ? 'read' : 'unread'

                return (
                    <li key={mail.id} className={isReadClass}>
                        <Link to={`/mail/${mail.id}`}>
                            <MailPreview mail={mail} />
                        </Link>
                    </li>
                )
            })}
        </ul>
    )

}
