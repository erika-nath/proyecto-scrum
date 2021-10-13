import React from 'react';
import { TodoItem } from './TodoItem';


//funcion recorre array todos y va a imprimir cada uno,a agrega a cada todo una id
export function TodoList({ todos, toggleTodo }){
    return (<ul>
        {todos.map((todo) => (
            //propiedades de TodoItem
            <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
        ))}
    </ul>
    );
}