export function NoteImg({ info }) {

    function getDefaultUrl(ev) {
        ev.target.src = 'https://via.placeholder.com/150'
    }

    const { title, url } = info
    return (
        <section className="note-text">
            <img src={url} onError={getDefaultUrl} alt="note-image" />
            <h1>{title}</h1>
        </section>
    )
}