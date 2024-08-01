// import { todoStyle } from "./styles/todoStyle"
import TodoContainer from "./styledComponents/TodoContainer"
import TodoList from "./components/todo/TodoList"
import TodoHeader from "./components/todo/TodoHeader"
import WelcomeScreen from "./components/auth/WelcomeScreen"
import useAuth from "./hooks/useAuth"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"

function App({ children }: { children?: React.ReactNode }) {
  const { user, loading } = useAuth()
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {children}
        <TodoContainer>
          <TodoHeader />
          <div>
            { loading && <h1>Loading...</h1>}
            {/* <TodoList /> */}
            {!user && <WelcomeScreen />}
            {user && <TodoList />}
          </div>
        </TodoContainer>
      </LocalizationProvider>
    </>
  )
}

export default App
