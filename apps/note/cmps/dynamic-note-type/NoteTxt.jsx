export function NoteTxt({ info = { txt: '' }, onChangeInfo, onToggleEditModal, id }) {
    
    const { txt } = info

    const isEditable = typeof onChangeInfo === 'function';
    const editClass = isEditable ? 'editable' : ''

    return (
        <section className={`note-text ${editClass}`} onClick={() => onToggleEditModal(id)}>
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
                    <p>{txt}</p>
                </div>
            )}
        </section>
    )
}