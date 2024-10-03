export function NoteTxt({ info, onChangeInfo }) {

    const { txt } = info

    const isEditable = typeof onChangeInfo === 'function';
    const editClass = isEditable ? 'editable' : ''

    return (
        <section className={`note-text ${editClass}`}>
            {isEditable ? (
                <input
                    autoFocus
                    placeholder="Note"
                    type="text"
                    name="txt"
                    value={txt}
                    onChange={onChangeInfo}
                    className="note-text-input" 
                />
            ) : (
                <h1>{txt}</h1>
            )}
        </section>
    )
}