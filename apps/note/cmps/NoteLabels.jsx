const { useState } = React

export function NoteLabels({ createdAt }) {
    const [showLabel, setShowLabel] = useState(true)
    const FIVE_MINUTES = 300000
    const now = Date.now()
    const isNew = now - createdAt < FIVE_MINUTES


    if (!isNew || !showLabel) return null
    return (
        <section className="note-labels">
            <span className="new-label">
                New
                <button className="remove-btn" onClick={() => setShowLabel(false)}>X</button>
            </span>
        </section>
    )
}

