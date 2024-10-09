export function MailPreview({ mail, showDelete }) {

    const isReadClass = mail.isRead ? 'read' : 'unread'

    // Helper function to truncate text
    function truncateText(text, maxLength = 30) {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
    }

    return (
        <div className="mail-preview">
            <span className="from">{mail.from}</span>
            <span className="subject">{truncateText(mail.subject)}</span>
            {/* <span className="date">{new Date(mail.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span> */}
            {<span className="date">{new Date(mail.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>}
        </div>
    )
}
