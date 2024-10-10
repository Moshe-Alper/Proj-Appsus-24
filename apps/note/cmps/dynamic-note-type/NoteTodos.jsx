const { useRef, useEffect, useState } = React

export function NoteTodos({ info, onChangeInfo, onToggleEditModal, id }) {
    const { todos } = info

    const isEditable = typeof onChangeInfo === 'function'
    const editClass = isEditable ? 'editable' : ''
    const todoRefs = useRef([])

    useEffect(() => {
        if (isEditable && todoRefs.current[0]) {
            todoRefs.current[0].focus()
        }
    }, [isEditable])

    function handleClick(ev) {
        if (ev.target.tagName === 'INPUT') return

        if (typeof onToggleEditModal === 'function') {
            onToggleEditModal(id)
        }
    }

    function handleTodoChange(idx, text) {
        onChangeInfo(idx, text)
    }

    function toggleTodoDone(idx) {
        const updatedTodos = [...todos]
        const todo = updatedTodos[idx]
        todo.doneAt = todo.doneAt ? null : Date.now()
        onChangeInfo(updatedTodos)
    }

    return (
        <section className={`note-todos ${editClass}`} onClick={handleClick}>
            <ul className="note-todos">
                {todos
                    .sort((a, b) => (a.doneAt ? 1 : 0) - (b.doneAt ? 1 : 0))
                    .map((todo, idx) => (
                        <li key={todo.id || idx} className={todo.doneAt ? 'done' : 'pending'}>
                            <input
                                type="checkbox"
                                checked={!!todo.doneAt}
                                onChange={() => toggleTodoDone(idx)}
                            />
                            {isEditable && !todo.doneAt ? ( 
                                <input 
                                    ref={(el) => (todoRefs.current[idx] = el)} 
                                    name={`todo-${idx}-txt`}
                                    type="text"
                                    value={todo.txt}
                                    onChange={(ev) => handleTodoChange(idx, ev.target.value)}
                                    className={todo.doneAt ? 'done' : 'pending'}
                                />
                            ) : (
                                <span>{todo.txt}</span> 
                            )}
                        </li>
                    ))}
            </ul>
        </section>
    )
}