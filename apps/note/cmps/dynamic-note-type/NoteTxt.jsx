export function NoteTxt({ info }) {

    const { txt } = info
    return (
        <section className="note-text">
            <h1>{txt}</h1>
        </section>
    )
}