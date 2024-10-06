

const { useEffect, useState } = React

import { mailService } from "../services/mail.service.js"
import { MailList } from "../cmps/MailList.jsx"
import { MailFilter } from "../cmps/MailFilter.jsx"
import { MailSideFilter } from "../cmps/MailSideFilter.jsx"

export function MailIndex() {
    const [mails, setMails] = useState(null)
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const [counts, setCounts] = useState({ inbox: 0, sent: 0, trash: 0, draft: 0 })
    const [selectedStatus, setSelectedStatus] = useState('inbox')

    const loggedinUser = { email: 'user@appsus.com', fullname: 'Mahatma Appsus' }

    useEffect(() => {
        loadMails()
        updateMailCounts()
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

    function handleStatusChange(status) {
        setSelectedStatus(status)
        onSetFilterBy({ status })
    }

    function onMailRead(mailId) {
        const mailToRead = mails.find(mail => mail.id === mailId)
        if (mailToRead && !mailToRead.isRead) {
            setCounts(prevCounts => {
                const newCounts = { ...prevCounts }
                newCounts.inbox = Math.max(0, newCounts.inbox - 1)
                return newCounts
            })
        }
    }

    if (!mails) return <h1>Loading...</h1>
    return (

        <section className="mail-index">
            <MailFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            <MailSideFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} counts={counts}  />
            <MailList mails={mails} onMailRead={onMailRead} />
        </section>
    )

}