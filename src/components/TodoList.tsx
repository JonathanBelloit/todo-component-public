import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getTodos, deleteTodo } from '../redux/todoSlice'
import { RootState } from '../redux/store'
import { useAppDispatch } from '../hooks/useAppDispatch'
//icons
import { FaInfoCircle } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
// local components
import TodoButton from './TodoButton'
import NewTodo from './NewTodo'

const TodoList = () => {
  // const todos = useSelector(getTodos)
  // console.log(todos)
  const [newTodoOpen, setNewTodoOpen] = useState(false)

  const handleDeleteTodo = (id: string) => {
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
        <div key={todo.id} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5, justifyContent: 'space-between' }}>
          <h2>{todo.title}</h2>
          <div style={{ display: 'flex', gap: 5, alignItems: 'center'}}>
            <FaInfoCircle color='#DBC53A'/>
            <MdDelete
              color="#E06546"
              fontSize="1.5em"
              onClick={() => handleDeleteTodo(todo.id ?? "")}
            />
          </div>
          {/* <p>{todo.description}</p> */}
        </div>
      ))}
      </div>
      { !newTodoOpen && <TodoButton title='Add Todo' onClick={() => setNewTodoOpen(true)} />}
      <NewTodo todoOpen={newTodoOpen} setTodoOpen={setNewTodoOpen} />
    </div>
  )
}

export default TodoList