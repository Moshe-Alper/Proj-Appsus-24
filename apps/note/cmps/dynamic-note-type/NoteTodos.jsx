export function NoteTodos({ info }) {

    console.log('info:', info)
    const { todos } = info
    console.log('todos:', todos)
    return (
        <section className="note-text">
            <ul className="note-todos">
                {todos.map((todo, index) => (
                    <li key={index} className={todo.doneAt ? 'done' : 'pending'}>
                    {todo.txt}
                </li>
                ))}
            </ul>
        </section>
    )
}