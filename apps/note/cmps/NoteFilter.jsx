const { useState, useEffect } = React

export function NoteFilter({ filterBy, onSetFilterBy }) {

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

    const { txt, type } = filterByToEdit

    function onSubmit(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    return (
        <section className="note-filter">
            <div className="search-btn">
                <img src="./../assets/img/google-material-icons/search.svg" alt="search-btn" />
            </div>
            <form onSubmit={onSubmit}>
                <input
                    value={txt}
                    name="txt"
                    onChange={handleChange}
                    type="text"
                    id="txt"
                    placeholder="Search"
                />
            </form>
        </section>
    )
}