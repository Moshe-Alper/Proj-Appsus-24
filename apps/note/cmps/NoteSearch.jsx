const { useEffect, useRef } = React

export function NoteSearch({ onSetFilterBy, setIsFiltering }) {
    const formRef = useRef(null)

    useEffect(() => {
        function handleClickOutside(event) {
            if (formRef.current && !formRef.current.contains(event.target)) {
                setIsFiltering(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [setIsFiltering])

    function handleSearch(searchType) {
        setIsFiltering(false);  
        onSetFilterBy({ type: searchType })
    }

    return (
        <form className="note-search" ref={formRef}>
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
        </form>
    );
}