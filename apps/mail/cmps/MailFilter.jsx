const { useState, useEffect } = React

export function MailFilter({ filterBy, onSetFilterBy }) {
    

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function onSubmit(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    return (
        <section className="mail-filter">
            <form onSubmit={onSubmit}>
                <div>
                    <input
                        type="text"
                        name="txt"
                        placeholder="Search mail"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        type="checkbox"
                        name="isRead"
                        checked={filterByToEdit.isRead} 
                        onChange={handleChange}
                    />
                    Show Read Emails
                </div>
            </form>

        </section>
    )
}