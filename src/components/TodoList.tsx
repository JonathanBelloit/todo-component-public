import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getTodos, addTodo, deleteTodo } from '../redux/todoSlice'
import { RootState } from '../redux/store'
import { useAppDispatch } from '../hooks/useAppDispatch'
//icons
import { FaInfoCircle } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
// local components
import TodoButton from './TodoButton'

const TodoList = () => {
  // const todos = useSelector(getTodos)
  // console.log(todos)
  const [hideInput, setHideInput] = useState(true)
  const [todoInput, setTodoInput] = useState({
    title: '',
    description: ''
  })

  const handleAddTodo = () => {
    if (hideInput === true) {
      setHideInput(false)
    } else if (hideInput === false) {
      dispatch(addTodo(todoInput))
      setHideInput(true)
      setTodoInput({ title: '', description: ''})
    }
    // alert('Todo added successfully')
  }

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id))
  }

  const dispatch = useAppDispatch();
  const todos = useSelector((state: RootState) => state.todos.todos);
  useEffect(() => {
    dispatch(getTodos())
  }, [dispatch])
  console.log(todos)
  return (
    <div>
      <div>
        {todos.map((todo) => (
        <div key={todo.id} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5}}>
          <h2>{todo.title}</h2>
          <FaInfoCircle />
          <MdDelete color="red" fontSize="1.5em" onClick={() => handleDeleteTodo(todo.id)} />
          {/* <p>{todo.description}</p> */}
        </div>
      ))}
      </div>
      { !hideInput && (
        <div>
          <input type='text' value={todoInput.title} onChange={(e) => setTodoInput({ ...todoInput, title: e.target.value })} placeholder='Title' style={{ display: 'flex', flexGrow: 1, width: '90%' }}/> 
          <input type='text' value={todoInput.description} onChange={(e) => setTodoInput({ ...todoInput, description: e.target.value })} placeholder='Details' style={{ display: 'flex', flexGrow: 1, width: '90%' }}/> 
        </div>
      )}
      
      {/* <TodoButton title={!todoInput.title && hideInput ? "Add Todo" : "Cancel"} onClick={todoInput.title ? handleAddTodo : () => setHideInput(!hideInput)} /> */}
      { hideInput && (
        <TodoButton title="Add Todo" onClick={handleAddTodo} />
      )}
      { !hideInput && (
        <TodoButton title={todoInput.title ? "Add Todo" : "Cancel"} onClick={todoInput.title ? handleAddTodo : () => setHideInput(!hideInput)} />
      )}
    </div>
  )
}

export default TodoList