export function MailPreview({ mail }) {

    return (
        <article className="mail-preview">
            <h3>{mail.subject}</h3>
            <p>From: {mail.from}</p>
            <p>To: {mail.to}</p>
            <p>{mail.body}</p>
            <p>{new Date(mail.createdAt).toLocaleString()}</p>
        </article>
    )
}
