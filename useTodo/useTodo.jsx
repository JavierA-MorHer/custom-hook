import { useEffect } from 'react';
import { useReducer } from 'react';
import { todoReducer } from './todoReducer';
import { useCounter } from './useCounter';


export const useTodo = ({initialState=[]}) => {

const init =()=>{
    return JSON.parse(localStorage.getItem('todo')) || [];
}
    const [todo, dispatch] = useReducer(todoReducer, initialState, init);

    const {increment}=useCounter(todo);

    useEffect(() => {
      localStorage.setItem('todo', JSON.stringify(todo));
    
    },[todo])

    const handleNewTodo = (todo)=>{
        const action = {
         type: 'Add Todo',
         payload: todo
        }
     
        dispatch(action);
     }
    
     const handleDeleteTodo = (id)=>{
        dispatch({
            type: 'Remove Todo',
            payload: id
        })
     }
    
     const handleToggleTodo = (id)=>{
        dispatch({
            type: 'Toggle Todo',
            payload: id
        })
     }


  return {
    todo,
    todoCount : todo.length,
    todoPendingCount : todo.filter(todo=>!todo.done).length,
    handleNewTodo,
    handleDeleteTodo,
    handleToggleTodo,
  }
}
