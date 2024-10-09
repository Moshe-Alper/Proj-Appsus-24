
const { Link, useSearchParams } = ReactRouterDOM
const { useEffect, useState } = React

import { mailService } from "../services/mail.service.js"
import { MailList } from "../cmps/MailList.jsx"
import { MailFilter } from "../cmps/MailFilter.jsx"
import { MailSideFilter } from "../cmps/MailSideFilter.jsx"
import { getTruthyValues } from "../services/util.service.js"
import { MailHeader } from "../cmps/MailHeader.jsx"


export function MailIndex() {
    const [mails, setMails] = useState(null)
    const [searchPrms, setSearchPrms] = useSearchParams()
    const [filterBy, setFilterBy] = useState(mailService.getFilterFromSearchParams(searchPrms))
    const [counts, setCounts] = useState()


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
        console.log('after update counts',newCounts)
        setCounts(newCounts)
    }

    if (!mails) return <h1>Loading...</h1>
    return (

        <section className="mail-index">
            <MailHeader
                filterBy={filterBy}
                onSetFilterBy={onSetFilterBy} />
            <main className="mail-container">
                <section>
                    <Link to="/mail/edit" >Compose Mail</Link>
                </section>
                <MailList mails={mails} setMails={setMails} counts={counts} updateCounts={updateCounts} />
                <MailSideFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} counts={counts} />
            </main>
        </section >
    )

}