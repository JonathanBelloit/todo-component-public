import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getTodos, deleteTodo } from "../redux/todoSlice";
import { RootState } from "../redux/store";
import { useAppDispatch } from "../hooks/useAppDispatch";
//icons
import { FaInfoCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
// local components
import TodoButton from "./TodoButton";
import NewTodo from "./NewTodo";

const TodoList = () => {
  // const todos = useSelector(getTodos)
  // console.log(todos)
  const [newTodoOpen, setNewTodoOpen] = useState(false);

  const handleDeleteTodo = (id: string) => {
    dispatch(deleteTodo(id));
  };

  const dispatch = useAppDispatch();
  const todos = useSelector((state: RootState) => state.todos.todos);
  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  const containerStyle = {
    maxWidth: "500px",
    // margin: "0 2rem auto",
    padding: "1rem 2rem",
    backgroundColor: "#f9f9f9",
  };

  const todoItemStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 1rem",
    marginBottom: "0.5rem",
    borderRadius: "5px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.3s",
  };

  const todoItemHoverStyle = {
    backgroundColor: "#f1f1f1",
  };

  return (
    <div style={containerStyle}>
      <div>
        {todos.map((todo) => (
          <div
            key={todo.id}
            style={todoItemStyle}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = todoItemHoverStyle.backgroundColor)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = todoItemStyle.backgroundColor)}
          >
            <h2>{todo.title}</h2>
            <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
              <FaInfoCircle color="#DBC53A" />
              <MdDelete
                color="#E06546"
                fontSize="1.5em"
                onClick={() => handleDeleteTodo(todo.id ?? "")}
              />
            </div>
          </div>
        ))}
      </div>
      {!newTodoOpen && (
        <TodoButton title="Add Todo" onClick={() => setNewTodoOpen(true)} />
      )}
      <NewTodo todoOpen={newTodoOpen} setTodoOpen={setNewTodoOpen} />
    </div>
  );
};

export default TodoList;
