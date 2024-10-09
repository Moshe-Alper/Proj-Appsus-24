const { useState, useRef, useEffect } = React

export function NoteTxt({ info = { txt: '' }, onChangeInfo, onToggleEditModal, id }) {

    const { txt } = info

    const isEditable = typeof onChangeInfo === 'function';
    const editClass = isEditable ? 'editable' : ''

    function handleClick(ev) {
        if (ev.target.tagName === 'INPUT') return;

        if (typeof onToggleEditModal === 'function') {
            onToggleEditModal(id)
        }
    }

    return (
        <section className={`note-text ${editClass}`} onClick={handleClick}>
            {isEditable ? (
                <div className="note-input">
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