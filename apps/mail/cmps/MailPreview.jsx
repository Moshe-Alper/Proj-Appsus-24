export function MailPreview({ mail }) {

    const isReadClass = mail.isRead ? 'read' : 'unread'

    // Helper function to truncate text
    function truncateText(text, maxLength = 30) {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
    }

    return (
        <article className={`mail-preview ${isReadClass}`}>

            <span className="from">{mail.from}</span>

            <span className="subject">{truncateText(mail.subject)}</span>
            <span className="date">{new Date(mail.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
            {/* <p className="body">{truncateText(mail.body, 50)}</p> */}
        </article>
    )
}
