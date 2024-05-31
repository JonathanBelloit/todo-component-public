// import { todoStyle } from "./styles/todoStyle"
import TodoContainer from "./styledComponents/TodoContainer"
import TodoList from "./components/todo/TodoList"
import TodoHeader from "./components/todo/TodoHeader"
import WelcomeScreen from "./components/auth/WelcomeScreen"
import useAuth from "./hooks/useAuth"
function App() {
  const { user, loading } = useAuth()
  return (
    <>
      <TodoContainer>
        <TodoHeader />
        <div>
          { loading && <h1>Loading...</h1>}
          {/* <TodoList /> */}
          {!user && <WelcomeScreen />}
          {user && <TodoList />}
        </div>
      </TodoContainer>
    </>
  )
}

export default App
