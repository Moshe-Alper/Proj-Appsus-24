const { Link } = ReactRouterDOM
import { MailPreview } from "./MailPreview.jsx";

export function MailList({ mails, onMailRead }) {
    return (
        <ul className="mail-list">
            {mails.map(mail => (
                <li key={mail.id}>
                    <Link
                        to={`/mail/${mail.id}`}
                        onClick={() => onMailRead(mail.id)} // Call onMailRead with the mail.id
                    >
                        <MailPreview mail={mail} />
                    </Link>
                </li>
            ))}
        </ul>
    )
}
