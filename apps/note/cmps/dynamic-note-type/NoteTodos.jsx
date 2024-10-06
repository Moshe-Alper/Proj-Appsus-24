export function NoteTodos({ info }) {

    const { todos } = info
    return (
        <section className="note-text">
            <ul>
                {todos.map((todo, index) => (
                    <li key={index}>
                        {todo.doneAt ? ' (Done)' : ' (Pending)'} 
                    </li>
                ))}
            </ul>
        </section>
    )
}