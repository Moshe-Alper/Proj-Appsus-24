const { useRef, useEffect } = React

export function NoteImg({ info = { imgSrc: '', txt: '' }, onChangeInfo, onToggleEditModal, id }) {
    const inputRef = useRef(null)

    const isEditable = !!onChangeInfo
    const editClass = isEditable ? 'editable' : ''

    function getDefaultUrl(ev) {
    ev.target.src = 'https://via.placeholder.com/150'
    }

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

    const { imgSrc, txt } = info

    return (
        <section className={`note-img ${editClass}`} onClick={handleClick}>
            {isEditable ? (
                <div className="note-input">
                    <img src={imgSrc} onError={getDefaultUrl} alt="note-image" />

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
                    <img src={imgSrc} onError={getDefaultUrl} alt="note-image" />
                    <p>{txt}</p>
                </div>
            )}
        </section>
    )
}