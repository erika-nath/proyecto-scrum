import React, { Fragment, useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'
import { TodoList } from './components/TodoList';
//APP es la raiz
//uuid libreria para craear ids 
//key se va a utolizar para el local storage
const KEY = "todoApp.todos";

export function App(){
    const [todos, setTodos] = useState([{ id:1, task:"Tarea 1", completed: false },]);
    const todoTaskRef = useRef();

    
useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(KEY));
//se valida si hay algo almacenado
    if (storedTodos){
        setTodos(storedTodos);
    }
},[]);



    //guardar array de todos en local storage
    useEffect(()=> {localStorage.setItem(KEY,JSON.stringify(todos));
}, [todos] );

    //funcion toggleTodo que recibe el id del todo y dentro de este se crea una copia de los todos
    const toggleTodo = (id) => {
        const newTodos = [...todos];
        // busca el todo que contiene el id del todo que se esta pasando
        const todo = newTodos.find ((todo)=> todo.id ===id);
        //se modifica
        todo.completed = !todo.completed;
        //se envia
        setTodos(newTodos);
    };



    //funcion si el input esta vacio
    const handleTodoAdd = () => {
        const task = todoTaskRef.current.value;
        if (task === '') return;

        //estado anterior
        //uuidv4 se ejejuta en id
        setTodos ((prevTodos)=> {
            return[...prevTodos,{id: uuidv4(), task, completed:false}];
        });

        //borrar del input la tarea que se agrego
        todoTaskRef.current.value= null;
    };

    //funcion para borrar las tareas completadas,
    const handleClearAll = () =>{
        const newTodos = todos.filter((todo) => !todo.completed);
        setTodos(newTodos);
    };
    //Agregar tarea
    // se agrega la propiedad toggleTodo con su funcion
    return(
    <Fragment>
     <TodoList todos= {todos} toggleTodo={toggleTodo} />
     <input ref={todoTaskRef} type="text" placeholder="Nueva tarea" />
     <button onClick={handleTodoAdd}>➕</button>
     <button onClick={handleClearAll}>🗑️</button>
     <div>
         Te quedan {todos.filter ((todo) => !todo.completed).length}tareas por terminar
     </div>
     </Fragment>
     );
}