
const { useNavigate, useParams, useLocation } = ReactRouterDOM
const { useState, useEffect } = React

import { mailService } from "../services/mail.service.js"

export function MailCompose({ onSendMail, onCloseCompose }) {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    
    const initialSubject = queryParams.get('subject') || ''
    const initialBody = queryParams.get('body') || ''
    console.log('Subject:', initialSubject)
    console.log('Body:', initialBody)


    const [newMail, setNewMail] = useState({...mailService.getEmptyMail(),
        subject: initialSubject,
        body: initialBody
    })

    function handleChange({ target }) {
        console.log(target.value)
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }
        setNewMail(prevMail => ({ ...prevMail, [field]: value }))
    }

    function onComposeSubmit(ev) {
        ev.preventDefault()
        onSendMail(newMail)
        setNewMail(mailService.getEmptyMail())
    }

    return (
        <section className="compose-mail-form">
            <div>
                <button className="close-btn" onClick={() => onCloseCompose(false)}><img src="assets/img/google-material-icons/close.svg" alt="search-btn" /></button>
            </div>
            <form onSubmit={onComposeSubmit}>

                <input
                    className="compose-to"
                    type="email"
                    placeholder="To"
                    name="to"
                    value={newMail.to}
                    onChange={handleChange}
                />

                <input
                    className="compose-subject"
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={newMail.subject}
                    onChange={handleChange}

                />
                <textarea
                    className="compose-textarea "
                    name="body"
                    value={newMail.body}
                    onChange={handleChange}

                />

                <button className="btn-send" type="submit">Send</button>
            </form>
        </section>
    )
}