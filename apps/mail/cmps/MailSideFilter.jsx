const { useState, useEffect } = React

export function MailSideFilter({ filterBy, onSetFilterBy }) {

    const [selectedStatus, setSelectedStatus] = useState(filterBy.status || 'inbox' )
    
    // console.log(filterBy)
    function handleStatusChange(status) {
        setSelectedStatus(status)
        onSetFilterBy({ ...filterBy, status })
    }

    return (
        <section className="mail-side-filter">
            <nav>
                <ul>
                    <li className={selectedStatus === 'inbox' ? 'active' : ''} 
                        onClick={() => handleStatusChange('inbox')}>
                        Inbox
                    </li>
                    <li className={selectedStatus === 'sent' ? 'active' : ''} 
                        onClick={() => handleStatusChange('sent')}>
                        Sent
                    </li>
                    <li className={selectedStatus === 'trash' ? 'active' : ''} 
                        onClick={() => handleStatusChange('trash')}>
                        Trash
                    </li>
                    <li className={selectedStatus === 'draft' ? 'active' : ''} 
                        onClick={() => handleStatusChange('draft')}>
                        Draft
                    </li>
                </ul>
            </nav>
        </section>
    )
}
