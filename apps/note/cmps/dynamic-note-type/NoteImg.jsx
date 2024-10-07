export function NoteImg({ info }) {

    function getDefaultUrl(ev) {
        ev.target.src = 'https://via.placeholder.com/150'
    }
    const { imgSrc, txt } = info
    return (
        <section className="note-text">
            <img src={imgSrc} onError={getDefaultUrl} alt="note-image" />
            <p>{txt}</p>
        </section>
    )
}