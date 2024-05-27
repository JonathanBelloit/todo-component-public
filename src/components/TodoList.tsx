import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getTodos } from '../redux/todoSlice'
import { RootState } from '../redux/store'
import { useAppDispatch } from '../hooks/useAppDispatch'

const TodoList = () => {
  // const todos = useSelector(getTodos)
  // console.log(todos)
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
        <div key={todo.id}>
          <h2>{todo.title}</h2>
          {/* <p>{todo.description}</p> */}
        </div>
      ))}
      </div>
    </div>
  )
}

export default TodoList