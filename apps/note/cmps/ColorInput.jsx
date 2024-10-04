export function ColorInput({ onSetNoteStyle, backgroundColor }) {

    const colors = [
        '#F44236',
        '#9C27B0',
        '#3F51B5',
        '#2196F3',
        '#4caf50',
        '#101010',
    ]
    function onSetColor(color) {
        const newStyle = { backgroundColor: color }
        onSetNoteStyle(newStyle)
    }

    function onColorInput(ev) {
        ev.preventDefault()
    }

    return (
        <section className="color-input">
            <form className="items-container" onSubmit={onColorInput}>
                {colors.map(color => (

                    <div
                        key={color}
                        className={`item ${color===backgroundColor ? 'chosen' : '' }`}
                        style={{ backgroundColor: color }}
                        onClick={() => onSetColor(color)}
                    ></div>

                ))}
            </form>
        </section >
    )
}