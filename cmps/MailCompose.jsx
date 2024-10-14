const { useLocation } = ReactRouterDOM

export function MailCompose() {
    const location = useLocation()
    const { subject = 'No Subject', body = 'No Body' } = location.state || {}

    console.log('Subject:', subject)
    console.log('Body:', body)

    return (
        <div>
            <h1>{subject}</h1>
            <h2>{body}</h2>
        </div>
    )
}