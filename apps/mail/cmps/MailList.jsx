const { Link } = ReactRouterDOM
import { MailPreview } from "./MailPreview.jsx";


export function MailList({ mails }) {

    return (
        <ul className="mail-list">
            {mails.map(mail =>
                <li key={mail.id}>
                    {/* <MailPreview mail={mail} /> */}
                    <Link to={`/mail/${mail.id}`}>
                        <MailPreview mail={mail} />
                    </Link>
                </li>
            )}
        </ul>
    )

}
