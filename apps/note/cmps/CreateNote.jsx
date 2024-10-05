export function CreateNote(props) {
    return <section className="create-note">
        <form>
            <input 
            type="title" 
            placeholder="Take a note..." 
            name="title"
            />
            <p>
                <textarea 
                name="content" 
                placeholder="Take a note..."></textarea>
            </p>
    </form>
    </section>
}