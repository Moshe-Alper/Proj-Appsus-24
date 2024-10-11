
const { useNavigate, useParams } = ReactRouterDOM
const { useState, useEffect } = React

import { mailService } from "../services/mail.service.js"

export function MailCompose({ onSendMail, onCloseCompose }) {
    const [newMail, setNewMail] = useState(mailService.getEmptyMail())
    const [isCompose, setIsCompose] = useState(false)

    // useEffect(() => {
    //     onCloseCompose(isCompose)
    // }, [isCompose])

    function handleChange({ target }) {
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

    // Handle form submission
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
                <label>

                    <input
                        type="email"
                        placeholder="To"
                        value={newMail.to}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    <input
                        type="text"
                        placeholder="Subject"
                        value={newMail.subject}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    <textarea
                        name="body"
                        value={newMail.body}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button className="btn-send" type="submit">Send</button>
            </form>
        </section>
    )
}