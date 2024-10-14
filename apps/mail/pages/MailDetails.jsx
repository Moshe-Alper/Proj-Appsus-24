const { useEffect, useState } = React
const { useParams, useNavigate, Link, useOutletContext } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"

export function MailDetails({ }) {

    const [mail, setMail] = useState(null)
    const params = useParams()
    const navigate = useNavigate()
    const { mails, setMails } = useOutletContext()

    useEffect(() => {
        loadMail()
    }, [params.mailId])


    function loadMail() {
        mailService.get(params.mailId)
            .then((loadedMail) => {
                if (!loadedMail.isRead) {
                    loadedMail.isRead = true
                    mailService.save(loadedMail)
                }
                setMail(loadedMail)
                const updatedMails = mails.map((currentMail) =>
                    currentMail.id === loadedMail.id ? loadedMail : currentMail
                )
                setMails(updatedMails)
            })
            .catch((err) => {
                console.error('Problem getting mail', err)
                showErrorMsg('Problem getting car')
                navigate('/mail')
            })
    }

    function onDeleteMail() {
        mailService.remove(params.mailId)
            .then(() => {
                setMails(prevMails => prevMails.filter(mail => mail.id !== params.mailId))
                navigate('/mail')
            })
            .catch(err => console.error('Failed to delete mail', err));
    }

    function onBack() {
        navigate(`/mail`)
    }

    if (!mail) return <div>Loading...</div>
    return (
        <section className="mail-details">
            <button onClick={onBack}className="btn-back"> <img src="assets/img/google-material-icons/back_mail.svg" alt="back_mail" />
            </button>
            <button onClick={onDeleteMail} className="btn-delete"><img src="assets/img/google-material-icons/delete.svg" alt="delete_mail" />
            </button>
            <p><strong>Body:</strong> {mail.body}</p>
        </section>
    )
}