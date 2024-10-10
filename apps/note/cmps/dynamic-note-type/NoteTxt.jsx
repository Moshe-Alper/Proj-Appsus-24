const { useRef, useEffect } = React

export function NoteTxt({ info = { txt: '' }, onChangeInfo, onToggleEditModal, id }) {

    const { txt } = info

    const isEditable = typeof onChangeInfo === 'function'
    const editClass = isEditable ? 'editable' : ''
    const inputRef = useRef(null)

    function handleClick(ev) {
        if (ev.target.tagName === 'INPUT') return

        if (typeof onToggleEditModal === 'function') {
            onToggleEditModal(id)
        }
    }

    useEffect(() => {
        if (isEditable && inputRef.current) {
            inputRef.current.focus()
        }
    }, [isEditable])

    return (
        <section className={`note-text ${editClass}`} onClick={handleClick}>
            {isEditable ? (
                <div className="note-input">
                    <input
                        ref={inputRef} 
                        placeholder="Note"
                        type="text"
                        name="txt"
                        value={txt}
                        onChange={onChangeInfo}
                    />
                </div>
            ) : (
                <div>
                    <p>{txt}</p>
                </div>
            )}
        </section>
    )
}