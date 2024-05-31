// import { todoStyle } from "./styles/todoStyle"
import TodoContainer from "./styledComponents/TodoContainer"
import TodoList from "./components/todo/TodoList"
import TodoHeader from "./components/todo/TodoHeader"
import WelcomeScreen from "./components/auth/WelcomeScreen"
// import Login from "./components/auth/Login"
function App() {
  
  return (
    <>
      <TodoContainer>
        <TodoHeader />
        <div>
          {/* <TodoList /> */}
          {/* <Login /> */}
          <WelcomeScreen />
        </div>
      </TodoContainer>
    </>
  )
}

export default App
