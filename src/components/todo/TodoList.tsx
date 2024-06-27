import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getTodos, deleteTodo } from "../../redux/todoSlice";
import { RootState } from "../../redux/store";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { Box, Typography } from "@mui/material";
// local components
import TodoButton from "./TodoButton";
import NewTodo from "./NewTodo";
import TodoModal from "./TodoModal";
import { Todo } from './interface'
import TodoListItem from "./TodoListItem";

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

  const handleModalOpen = (todo: Todo) => {
    setTodoModal(todo);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setTodoModal({} as Todo);
    setModalOpen(false);
  };

  const currentTodos = todos.filter((todo) => todo.urgency === "current");
  const urgentTodos = todos.filter((todo) => todo.urgency === "urgent");
  const backLogTodos = todos.filter((todo) => todo.urgency === "back log");
  const containerStyle = {
    maxWidth: "500px",
    padding: "1rem 2rem",
    backgroundColor: "#7493A2",
    borderBottomLeftRadius: "30px",
    borderBottomRightRadius: "30px",
  };

  return (
    <div style={containerStyle}>
      <Box>
      <Box>
          <Typography variant="h5" color="white">
            Urgent:
          </Typography>
        </Box>
        {urgentTodos.length === 0 ? (
          <Typography 
            variant="h5" 
            color="white" 
            textAlign={'center'}
            sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', padding: '1rem', borderRadius: '10px' }}
            >
              You have no urgent todos
          </Typography>
        ) : (
          urgentTodos.map((todo) => (
            <TodoListItem
              key={todo.id}
              todo={todo}
              handleModalOpen={handleModalOpen}
              handleDeleteTodo={handleDeleteTodo}
            />
          ))
        )}
      </Box>
      <Box>
        <Box>
          <Typography variant="h5" color="white">
            Current:
          </Typography>
        </Box>
        {currentTodos.length === 0 ? (
          <Typography 
          variant="h5" 
          color="white" 
          textAlign={'center'}
          sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', padding: '1rem', borderRadius: '10px' }}
          >
            You have no current todos
          </Typography>
        ) : (
          currentTodos.map((todo) => (
            <TodoListItem
              key={todo.id}
              todo={todo}
              handleModalOpen={handleModalOpen}
              handleDeleteTodo={handleDeleteTodo}
            />
          ))
        )}
      </Box>
      <Box>
        <Box>
          <Typography variant="h5" color="white">
            Back Log:
          </Typography>
        </Box>
        {backLogTodos.length === 0 ? (
          <Typography 
          variant="h5" 
          color="white" 
          textAlign={'center'}
          sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', padding: '1rem', borderRadius: '10px' }}
          >
            You have no back log todos
          </Typography>
        ) : (
          backLogTodos.map((todo) => (
            <TodoListItem
              key={todo.id}
              todo={todo}
              handleModalOpen={handleModalOpen}
              handleDeleteTodo={handleDeleteTodo}
            />
          ))
        )}
      </Box>
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
