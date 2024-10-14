export function ColorInput({ onSetNoteStyle, backgroundColor, onToggleStyleModal }) {

    const colors = [
        'rgb(246, 235, 97)',
        'rgb(239, 154, 154)',
        'rgb(255, 204, 128)',
        'rgb(200, 230, 201)',
        'rgb(178, 235, 242)',
        'rgb(187, 222, 251)',
        'rgb(225, 190, 231)',
        'rgb(248, 187, 208)'
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
            <div className="items-container" onSubmit={onColorInput}>
                {colors.map(color => (

                    <div
                        key={color}
                        className={`item ${color === backgroundColor ? 'chosen' : ''}`}
                        style={{ backgroundColor: color }}
                        onClick={() => onSetColor(color)}
                    ></div>

                ))}
                <button className="btn-note" onClick={onToggleStyleModal}>x</button>
            </div>
        </section >
    )
}