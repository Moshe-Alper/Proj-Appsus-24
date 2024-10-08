export function NoteSearch({ handleFilterChange }) {
    return (
        <section className="note-search">
            <div className="note-search-container">
                <h1>Types</h1>
                <div className="search-items">
                    <div className="search-item" onClick={() => handleFilterChange('NoteImg')}>
                        <img src="../../../assets/img/google-material-icons/image.svg" alt="Image Notes" />
                        <h2>Image</h2>
                    </div>

                    <div className="search-item" onClick={() => handleFilterChange('NoteTodos')}>
                        <img src="../../../assets/img/google-material-icons/list.svg" alt="Todo Notes" />
                        <h2>Lists</h2>
                    </div>
                </div>
            </div>
        </section>
    )
}