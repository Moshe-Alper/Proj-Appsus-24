const { useEffect, useState } = React
const { useParams, useNavigate, Link ,useOutletContext} = ReactRouterDOM

import { mailService } from "../services/mail.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"

export function MailDetails() {

    const [mail, setMail] = useState(null)
    const params = useParams()
    const navigate = useNavigate()
    const { setMails } = useOutletContext()
    
   console.log(setMails)
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
                navigate('/mail')
            })
    }

    function onDeleteMail() {
        console.log(params.mailId)
        mailService.remove(params.mailId)
        .then(() => {
            // Update the state after deletion
            setMails(prevMails => prevMails.filter(mail => mail.id !== params.mailId));
            
            // Navigate back to the mail list
            navigate('/mail');
          })
          .catch(err => console.error('Failed to delete mail', err));
    }

    function onBack() {
        navigate(`/mail`)
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