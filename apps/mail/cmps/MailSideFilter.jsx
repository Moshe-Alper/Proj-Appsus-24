const { useState, useEffect } = React

export function MailSideFilter({ filterBy, onSetFilterBy, counts }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    const handleChange = (folder) => {
        setFilterByToEdit(prevFilter => ({
            ...prevFilter,
            folder: folder
        }))
    }

    const folders = ['Inbox', 'Sent', 'Trash', 'Draft']
    return (
        <section className="mail-side-filter">
            <nav>
                <ul>
                    {folders.map(folder => (
                        <li
                            key={folder}
                            className={filterBy.folder === folder ? 'active' : ''}
                            onClick={() => handleChange(folder)}
                        >
                            <section className="btn-sidebar">
                                <img
                                    src={`assets/img/google-material-icons/${folder}.svg`}
                                    alt={`${folder}-icon`}
                                />
                               <span className="folder-name">{folder}</span>
                               <span className="folder-count">{counts[folder]}</span>
                            </section>
                        </li>
                    ))}
                </ul>
            </nav>
        </section>
    )
}
