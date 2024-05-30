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
import TodoModal from "./TodoModal";
import { Todo } from './interface'

const TodoList = () => {
  const [newTodoOpen, setNewTodoOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [todoModal, setTodoModal] = useState<Todo>({} as Todo);

  const handleDeleteTodo = (id: string) => {
    dispatch(deleteTodo(id));
  };

  const dispatch = useAppDispatch();
  const todos = useSelector((state: RootState) => state.todos.todos);
  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  const handleModalOpen = ({ todo }: { todo: Todo }) => {
    setTodoModal(todo);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setTodoModal({} as Todo);
    setModalOpen(false);
  };

  const containerStyle = {
    maxWidth: "500px",
    padding: "1rem 2rem",
    backgroundColor: "#7493A2",
    borderBottomLeftRadius: "30px",
    borderBottomRightRadius: "30px",
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
    transform: "scale(1)",
  };

  const todoItemHoverStyle = {
    backgroundColor: "#f1f1f1",
    transform: "scale(1.05)",
  };

  return (
    <div style={containerStyle}>
      <div>
        {todos.map((todo) => (
          <div
            key={todo.id}
            style={todoItemStyle}
            onMouseEnter={(e) => (
              (e.currentTarget.style.backgroundColor =
                todoItemHoverStyle.backgroundColor),
              (e.currentTarget.style.transform = todoItemHoverStyle.transform)
            )}
            onMouseLeave={(e) => (
              (e.currentTarget.style.backgroundColor =
                todoItemStyle.backgroundColor),
              (e.currentTarget.style.transform = todoItemStyle.transform)
            )}
          >
            <h2>{todo.title}</h2>
            <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
              <FaInfoCircle
                color="#DBC53A"
                onClick={() => handleModalOpen({ todo })}
              />
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
      <TodoModal
        todo={todoModal}
        modalOpen={modalOpen}
        handleModalClose={handleModalClose}
      />
    </div>
  );
};

export default TodoList;
