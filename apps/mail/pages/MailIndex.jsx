
const { Link, useSearchParams,useNavigate,useLocation } = ReactRouterDOM
const { useEffect, useState } = React

import { showErrorMsg, showSuccessMsg, showUserMsg } from "../services/event-bus.service.js"
import { mailService } from "../services/mail.service.js"
import { MailList } from "../cmps/MailList.jsx"
import { MailFilter } from "../cmps/MailFilter.jsx"
import { MailSideFilter } from "../cmps/MailSideFilter.jsx"
import { getTruthyValues } from "../services/util.service.js"
import { MailHeader } from "../cmps/MailHeader.jsx"
import { MailCompose } from "../cmps/MailCompose.jsx"


export function MailIndex() {
    const [mails, setMails] = useState(null)
    const [searchPrms, setSearchPrms] = useSearchParams()
    const [filterBy, setFilterBy] = useState(mailService.getFilterFromSearchParams(searchPrms))
    const [counts, setCounts] = useState(null)
    const [isCompose, setIsCompose] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()


    useEffect(() => {
        loadMails()
        updateMailCounts()
        setSearchPrms(getTruthyValues(filterBy))
    }, [filterBy])

    useEffect(() => {
        if (location.pathname === '/mail/compose') {
            setIsCompose(true)
        }
    }, [location.pathname])

    function loadMails() {
        mailService.query(filterBy)
            .then(setMails)
            .catch(err => {
                console.log('Problems getting mails:', err)
            })
    }

    // Fetch counts for each folder
    function updateMailCounts() {
        mailService.getMailCountByFolder()
            .then(fetchedCounts => {
                setCounts(fetchedCounts)
            })
            .catch(err => {
                console.log('Problems fetching counts:', err)
            })
    }

    function onSetFilterBy(filterBy) {
        console.log(filterBy)
        setFilterBy((prevFilter) => ({ ...prevFilter, ...filterBy }))
    }

    function onUpdateCounts() {
        updateMailCounts()
    }

    function onRemoveMail(mailId) {
        mailService.get(mailId)
            .then(mail => {
                mail.removedAt = Date.now()
                mailService.save(mail)
                    .then(updatedMail => {
                        setMails(prevMails => prevMails.map(m => m.id === mailId ? updatedMail : m))
                        updateMailCounts()
                        loadMails()
                    })
                showSuccessMsg('Mail moved to Trash')
            })
            .catch(err => {
                console.error('Problems moving mail to trash:', err)
                showErrorMsg(`Could not move mail to trash (${mailId})`)
            })
    }

    function onSendMail(newMail) {
        mailService.save(newMail)
            .then((sentMail) => {
                console.log('newMail:', newMail)
                setMails((prevMails) => [...prevMails, sentMail])
                setIsCompose(false)
            })
            .catch(err => {
                console.log('Error sending mail:', err)
            })
        loadMails()
    }

    function onCloseCompose() {
        setIsCompose(false)
        navigate('/mail?folder=Inbox&filterBy=%5Bobject+Object%5D')
    }

    function onSetIsCompose() {
        setIsCompose(true)
        navigate('/mail/compose?folder=Inbox&filterBy=%5Bobject+Object%5D')
    }

    if (!mails) return <h1>Loading...</h1>
    return (

        <section className="mail-index">
            <MailHeader
                filterBy={filterBy}
                onSetFilterBy={onSetFilterBy} />
            <main className="mail-container">
                <div className="compose-mail-button">
                    <img
                        src={'assets/img/google-material-icons/pen.svg'}
                        alt={'pen-icon'}
                    />
                    <button onClick={onSetIsCompose}>Compose</button>
                </div>
                {isCompose && (

                    <div className="compose-mail-form" >
                        <MailCompose onSendMail={onSendMail} onCloseCompose={onCloseCompose} />
                    </div>

                )}
                <MailList mails={mails} setMails={setMails} counts={counts} 
                onUpdateCounts={onUpdateCounts} onRemoveMail={onRemoveMail}
                 filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
                <MailSideFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} counts={counts} />
            </main>
        </section >
    )

}