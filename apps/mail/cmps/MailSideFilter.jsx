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
                            {folder} {counts[folder] }
                        </li>
                    ))}
                </ul>
            </nav>
        </section>
    )
}
