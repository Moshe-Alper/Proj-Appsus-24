export function NoteTxt({ info = { txt: '' }, onChangeInfo }) {
    const { txt, content } = info

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
                <div>
                    <h1>{txt}</h1>
                    <p>{content}</p>
                </div>
            )}
        </section>
    )
}