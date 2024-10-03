export function NoteTxt({ info, handleChange }) {

    const { txt } = info

    const isEditable = typeof handleChange === 'function';
    const editClass = isEditable ? 'editable' : ''

    // console.log('txt:', txt)
    return (
        <section className={`note-text ${editClass}`}>
            {isEditable ? (
                <input
                    type="text"
                    name="txt"
                    value={txt}
                    onChange={handleChange}
                    className="note-text-input" 
                />
            ) : (
                <h1>{txt}</h1>
            )}
        </section>
    )
}