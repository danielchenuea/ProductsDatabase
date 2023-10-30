import React, { useRef } from "react";

type NewTodoProps = {
    onAddTodo: (todoText: string) => void;
}

const NewTodo : React.FC<NewTodoProps> = (props) => {

    const textInput = useRef<HTMLInputElement>(null)

    const todoSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        const enteredText = textInput.current!.value;
        props.onAddTodo(enteredText)
    }
    return (
        <form onSubmit={todoSubmitHandler}>
            <div>
                <label htmlFor="todo-text">Todo Text</label>
                <input type="text" id="todo-text" ref={textInput}></input>
            </div>
            <button type="submit">ADD TODO</button>
        </form>
    )
}

export default NewTodo;