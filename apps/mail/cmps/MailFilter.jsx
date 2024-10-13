const { useState, useEffect } = React

export function MailFilter({ filterBy, onSetFilterBy }) {


    const [filterByToEdit, setFilterByToEdit] = useState({ filterBy })

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
        <React.Fragment>
            <section className="mail-filter">
                <div className="search-btn">
                    <img src="assets/img/google-material-icons/search.svg" alt="search-btn" />
                </div>

                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        name="txt"
                        placeholder="Search mail"
                        onChange={handleChange}
                    />
                </form>
            </section>

            {/* <div className="checkbox-wrapper">
                <input
                    id="checkbox"
                    type="checkbox"
                    name="isRead"
                    checked={filterByToEdit.isRead}
                    onChange={handleChange}
                />
                <label htmlFor="checkbox">Show Read Mails</label>
            </div> */}
        </React.Fragment>
    )

}