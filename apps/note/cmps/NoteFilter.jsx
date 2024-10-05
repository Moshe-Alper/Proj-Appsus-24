const { useState, useEffect } = React

export function NoteFilter({ filterBy, onSetFilterBy }) {

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
                break
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function handleFilterChange(type) {
        setFilterByToEdit(prevFilter => ({ ...prevFilter, type }))
        setIsExpanded(false)
    }

    const { txt, type } = filterByToEdit

    function onSubmit(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    return (
        <section
    className="note-filter"
    onClick={() => { if (!isExpanded) setIsExpanded(true) }}
>
            
            <div  className="search-btn">
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
                {isExpanded && (

                <div className="filter-icons-container">
                <div className="filter-icon" onClick={() => handleFilterChange('NoteTxt')}>
                    <img src="./../assets/img/google-material-icons/label.svg" alt="Text Notes" />
                    <h1>Text</h1>
                </div>
                <div className="filter-icon" onClick={() => handleFilterChange('NoteImg')}>
                    <img src="./../assets/img/google-material-icons/image.svg" alt="Image Notes" />
                    <h1>Image</h1>
                </div>
                <div className="filter-icon" onClick={() => handleFilterChange('NoteTodos')}>
                    <img src="./../assets/img/google-material-icons/list.svg" alt="Todo Notes" />
                    <h1>List</h1>
                </div>
            </div>
            )}

            </form>


        </section>
    )
}