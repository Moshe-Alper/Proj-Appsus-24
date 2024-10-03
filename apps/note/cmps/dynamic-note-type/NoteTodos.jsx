export function NoteTodos({ info }) {

    const { title, todos } = info
    return (
        <section className="note-text">
            <h1>{title}</h1>
            <ul>
                {todos.map((todo, index) => (
                    <li key={index}>
                        {todo.txt} 
                        {todo.doneAt ? ' (Done)' : ' (Pending)'} 
                    </li>
                ))}
            </ul>
        </section>
    )
}