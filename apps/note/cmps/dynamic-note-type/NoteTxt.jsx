const { useState, useRef, useEffect } = React

export function NoteTxt({ info = { txt: '' }, onChangeInfo, onToggleEditModal, id }) {
    const [hasClicked, setHasClicked] = useState(false)

    const { txt, title } = info

    const isEditable = typeof onChangeInfo === 'function';
    const editClass = isEditable ? 'editable' : ''

    function handleClick() {
        if (!hasClicked) {
            setHasClicked(true)
            onToggleEditModal(id)
        }
    }

    function handleInputClick(ev) {
        if (ev.target.tagName === 'INPUT') {
            ev.stopPropagation()
        }
    }

    return (
        <section className={`note-text ${editClass}`} onClick={handleClick}>
        {isEditable ? (
            <div className="note-input" onClick={handleInputClick}>

                <input
                    placeholder="Title"
                    type="text"
                    name="title"
                    value={title}
                    onChange={onChangeInfo}
                    className="note-title"
                    />

                <input
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