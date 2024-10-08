export function NoteSearch({ onSetFilterBy, setIsFiltering  }) {

    function handleSearch(searchType) {
        setIsFiltering(false)  
        onSetFilterBy({ type: searchType })
    }
    
    return (
        <section className="note-search">
            <div className="note-search-container">
                <h1>Types</h1>
                <div className="search-items">
                    <div className="search-item" onClick={() => handleSearch('NoteImg')}>
                        <img src="../../../assets/img/google-material-icons/image.svg" alt="Image Notes" />
                        <h2>Image</h2>
                    </div>

                    <div className="search-item" onClick={() => handleSearch('NoteTodos')}>
                        <img src="../../../assets/img/google-material-icons/list.svg" alt="Todo Notes" />
                        <h2>Lists</h2>
                    </div>
                </div>
            </div>
        </section>
    )
}