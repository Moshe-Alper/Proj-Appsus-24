const { useEffect, useState } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"

export function MailDetails(){

    const [mail, setMail] = useState(null)
    const params = useParams()
    const navigate = useNavigate()
    
    useEffect(() => {
        loadMail()
    }, [params.mailId])
    
    function loadMail() {
        mailService.get(params.mailId)
            .then(setMail)
            .catch(err => {
                console.log('Problem getting mail', err)
                showErrorMsg('Problem getting mail')
                navigate('/mail')
            })
    }

    function onDeleteMail() {
        mailService.remove(params.mailId)
        navigate('/mail') 
    }

    function onBack() {
        navigate('/mail')
    }
    console.log(params)

    if (!mail) return <div>Loading...</div>
    return (
        <section className="mail-details">
           <button onClick={onBack}>Back to Mails</button>
           <button onClick={onDeleteMail}>Delete Mail</button>
           <p><strong>Body:</strong> {mail.body}</p>
        </section>
    )
}