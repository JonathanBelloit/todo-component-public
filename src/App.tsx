// import { todoStyle } from "./styles/todoStyle"
import TodoContainer from "./styledComponents/TodoContainer"
import TodoList from "./components/TodoList"
import TodoHeader from "./components/TodoHeader"
function App() {
  
  return (
    <>
      <TodoContainer>
        <TodoHeader />
        <div>
          <TodoList />
        </div>
      </TodoContainer>
    </>
  )
}

export default App
