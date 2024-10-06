const { useEffect, useState } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"

export function MailDetails() {

    const [mail, setMail] = useState(null)
    const params = useParams()
    const navigate = useNavigate()
 
    useEffect(() => {
        loadMail()
    }, [params.mailId])

    function loadMail() {
        mailService.get(params.mailId)
            .then(loadedMail => {
                if (!loadedMail.isRead) {
                    loadedMail.isRead = true
                    mailService.save(loadedMail)
                }
                setMail(loadedMail)
            })
            .catch(err => {
                console.error('Problem getting mail', err)
                navigate('/mail/folder')
            })
    }

    function onDeleteMail() {
        mailService.remove(params.mailId)
        navigate('/mail/folder')
    }

    function onBack() {
        navigate('/mail/folder')
    }

    if (!mail) return <div>Loading...</div>
    return (
        <section className="mail-details">
            <button onClick={onBack}>Back to Mails</button>
            <button onClick={onDeleteMail}>Delete Mail</button>
            <p><strong>Body:</strong> {mail.body}</p>
        </section>
    )
}