
const { useParams, useNavigate, Link } = ReactRouterDOM
const { useEffect, useState } = React

import { mailService } from "../services/mail.service.js"
import { MailList } from "../cmps/MailList.jsx"
import { MailFilter } from "../cmps/MailFilter.jsx"
import { MailSideFilter } from "../cmps/MailSideFilter.jsx"

export function MailIndex() {
    const [mails, setMails] = useState(null)
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const [counts, setCounts] = useState({ Inbox: 0, Sent: 0, Trash: 0, Draft: 0 })    
    // const loggedinUser = { email: 'user@appsus.com', fullname: 'Mahatma Appsus' }

    useEffect(() => {
        loadMails()
        updateMailCounts()
    }, [filterBy])

    function loadMails() {
        // filterBy.status = folder
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

console.log(filterBy)

    if (!mails) return <h1>Loading...</h1>
    return (

        <section className="mail-index">
            <MailFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            <MailSideFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} counts={counts}  />
            <MailList mails={mails} />
        </section>
    )

}