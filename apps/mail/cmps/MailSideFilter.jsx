const { useState, useEffect } = React

export function MailSideFilter({ filterBy, onSetFilterBy, counts }) {

    const [selectedStatus, setSelectedStatus] = useState(filterBy.status)

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
                        Inbox ({counts.inbox}) {/* Show unread count */}
                    </li>
                    <li className={selectedStatus === 'sent' ? 'active' : ''}
                        onClick={() => handleStatusChange('sent')}>
                        Sent ({counts.sent})
                    </li>
                    <li className={selectedStatus === 'trash' ? 'active' : ''}
                        onClick={() => handleStatusChange('trash')}>
                        Trash ({counts.trash})
                    </li>
                    <li className={selectedStatus === 'draft' ? 'active' : ''}
                        onClick={() => handleStatusChange('draft')}>
                        Draft ({counts.draft})
                    </li>
                </ul>
            </nav>
        </section>
    )
}
