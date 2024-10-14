const { useLocation } = React

export function MailCompose() {
    const location = useLocation()
    console.log('location:', location)
    const queryParams = new URLSearchParams(location.search)
    const subject = queryParams.get('subject')
    const body = queryParams.get('body')
    
    console.log('Subject:', subject)
    console.log('Body:', body)

    return (
        <div>
            <h1>{subject}</h1>
            <h2>{body}</h2>
        </div>
    )
}