// import { todoStyle } from "./styles/todoStyle"
import TodoContainer from "./styledComponents/TodoContainer"
import TodoList from "./components/TodoList"
function App() {
  
  return (
    <>
      <TodoContainer>
        <h1>Todo List</h1>
        <TodoList />
      </TodoContainer>
    </>
  )
}

export default App
