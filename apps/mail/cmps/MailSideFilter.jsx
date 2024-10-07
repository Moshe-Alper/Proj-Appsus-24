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

    const folders = ['Inbox', 'Sent', 'Trash', 'Delete']
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
                            {folder} {counts[folder] || 0}
                        </li>
                    ))}
                </ul>
            </nav>
        </section>
    )
}
