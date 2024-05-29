import { useState} from 'react'
import { addTodo } from '../redux/todoSlice'
import { useAppDispatch } from '../hooks/useAppDispatch'
import TodoButton from './TodoButton';

const NewTodo = ({
  todoOpen,
  setTodoOpen,
}: {
  todoOpen: boolean;
  setTodoOpen: (todoOpen: boolean) => void;
}) => {
  const [todoInput, setTodoInput] = useState({
    title: "",
    description: "",
  });

  const dispatch = useAppDispatch();

  const addNewTodo = () => {
    dispatch(addTodo(todoInput));
    setTodoOpen(false);
    setTodoInput({
      title: "",
      description: "",
    });
  };
  return (
    <>
      {todoOpen && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            border: "1px solid black",
            borderRadius: "5px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2>{todoInput.title}</h2>
            <button onClick={() => setTodoOpen(false)}>X</button>
          </div>
          <input
            type="text"
            placeholder="Enter Todo Title"
            value={todoInput.title}
            onChange={(e) =>
              setTodoInput({ ...todoInput, title: e.target.value })
            }
          />
          <label>Enter Todo Description:</label>
          <textarea
            value={todoInput.description}
            onChange={(e) =>
              setTodoInput({ ...todoInput, description: e.target.value })
            }
          />
          <TodoButton title="Add Todo" onClick={addNewTodo} />
          {/* <button onClick={addNewTodo}>Add Todo</button> */}
        </div>
      )}
    </>
  );
};

// const newTodoStyle = {
//   display: 'flex',
//   flexDirection: 'column',
//   border: '1px solid black',
//   borderRadius: '15px'
// }
export default NewTodo