const { useState, useEffect } = React

export function NoteFilter({ filterBy, onSetFilterBy, setIsFiltering }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const [isExpanded, setIsExpanded] = useState(false)

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
                break;
            default:
                setIsFiltering(false)
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    const { txt, type } = filterByToEdit

    function onSubmit(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    function handleFilter() {
        setIsFiltering(true)
        if (!isExpanded) {
            setIsExpanded(true)
        }
    }

    function handleReset(ev) {
        ev.stopPropagation()
        console.log('Resetting filters')
        setIsFiltering(false)
        setFilterByToEdit({ txt: '', type: '' })
    }

    return (
        <section
            className="note-filter"
            onClick={handleFilter}
        >

            <div className="search-btn">
                <img src="assets/img/google-material-icons/search.svg" alt="search" className="btn-note" />
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
                <button type="button" onClick={handleReset} className="btn-note" >
                <img src="assets/img/google-material-icons/close.svg" alt="close"  />
                </button>
            </form>


        </section>
    )
}