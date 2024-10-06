
const { useParams, useNavigate, Link } = ReactRouterDOM
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
    const { folder } = useParams()
    console.log(folder)
    // const loggedinUser = { email: 'user@appsus.com', fullname: 'Mahatma Appsus' }

    useEffect(() => {
        loadMails()
        updateMailCounts()
    }, [filterBy])


    function loadMails() {
        // filterBy.status = folder
        mailService.query(filterBy)
            .then(setMails,setSelectedStatus)
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

    // function onMailRead(mailId) {
    //     const mailToRead = mails.find(mail => mail.id === mailId);
        
    //     // Only mark as read if the mail isn't already read
    //     if (mailToRead && !mailToRead.isRead) {
    //         mailToRead.isRead = true;
    //         mailService.save(mailToRead);  // Save updated mail
    
    //         // Update the mails state (to trigger re-render) and reduce the unread count for the folder
    //         setMails(mails.map(mail => mail.id === mailId ? { ...mail, isRead: true } : mail));
            
    //         setCounts(prevCounts => {
    //             const newCounts = { ...prevCounts };
    //             newCounts[folder] = Math.max(0, newCounts[folder] - 1);  // Reduce unread count
    //             return newCounts;
    //         });
    //     }
    // }

    if (!mails) return <h1>Loading...</h1>
    return (

        <section className="mail-index">
            <MailFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            <MailSideFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} counts={counts}  />
            <MailList mails={mails} />
        </section>
    )

}