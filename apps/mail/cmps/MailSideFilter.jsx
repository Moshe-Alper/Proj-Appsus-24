const { useState, useEffect } = React

export function MailSideFilter({ filterBy, onSetFilterBy, counts }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    const folders = ['Inbox', 'Sent', 'Trash', 'Draft']

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleChange(folder) {
        setFilterByToEdit(prevFilter => ({
            ...prevFilter,
            folder: folder
        }))
    }

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
                                <div className="folder-name">{folder}</div>
                                {counts[folder] > 0 && (
                                    <div className="folder-count">{counts[folder]}</div>
                                )}
                            </section>
                        </li>
                    ))}
                </ul>
            </nav>
        </section>
    )
}
