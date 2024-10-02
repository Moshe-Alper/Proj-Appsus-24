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

    const isValid = txt

    return (
        <section className="note-filter">
            <form onSubmit={onSubmit}>
                <input
                    value={txt}
                    name="txt"
                    onChange={handleChange}
                    type="text"
                    id="txt"
                    placeholder="Search"
                />
                <button disabled={!isValid}>&#128269;</button>
            </form>
        </section>
    )
}