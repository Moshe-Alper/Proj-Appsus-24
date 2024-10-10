
const { Link, useSearchParams } = ReactRouterDOM
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
    const [counts, setCounts] = useState()
    const [isCompose, setIsCompose] = useState(false)


    useEffect(() => {
        loadMails()
        updateMailCounts()
        setSearchPrms(getTruthyValues(filterBy))
    }, [filterBy])

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
        setFilterBy((prevFilter) => ({ ...prevFilter, ...filterBy }))
    }

    function updateCounts(newCounts) {
        // console.log('after update counts', newCounts)
        setCounts(newCounts)
    }

    function onRemoveMail(mailId) {
        mailService.remove(mailId)
            .then(() => {
                setMails(mails => mails.filter(mail => mail.id !== mailId))
                showSuccessMsg(`Mail removed successfully!`)
            })
            .catch(err => {
                console.log('Problems removing mail:', err)
                showErrorMsg(`Problems removing mail (${mailId})`)
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
                    <button onClick={() => setIsCompose(true)}>Compose</button>
                </div>
                {isCompose && (

                    <div className="compose-mail-form" >
                        <MailCompose onSendMail={onSendMail} />
                    </div>

                )}
                <MailList mails={mails} setMails={setMails} counts={counts} updateCounts={updateCounts} onRemoveMail={onRemoveMail} />
                <MailSideFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} counts={counts} />
            </main>
        </section >
    )

}