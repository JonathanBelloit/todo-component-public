import { useState} from 'react'
import { addTodo } from '../../redux/todoSlice'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import TodoButton from './TodoButton';
import { motion, AnimatePresence } from 'framer-motion';

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

  const handleClose = () => {
    setTodoOpen(false);
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      y: "-100%",
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    }
  }
  return (
    <AnimatePresence>
      {todoOpen && (
        <div
          onClick={handleClose}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            overflowX: 'hidden',
            overflowY: 'hidden',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1,
          }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            style={{
              display: "flex",
              position: 'relative',
              flexDirection: "column",
              border: "1px solid black",
              borderRadius: "5px",
              maxWidth: "500px",
              margin: "2rem auto",
              backgroundColor: "white",
              padding: "10px",
              gap: 10
            }}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h2>{todoInput.title}</h2>
              <button onClick={handleClose}>X</button>
            </div>
            <input
              type="text"
              placeholder="Enter Todo Title"
              autoFocus
              value={todoInput.title}
              onChange={(e) =>
                setTodoInput({ ...todoInput, title: e.target.value })
              }
            />
            <label>Enter Todo Description:</label>
            <textarea
              value={todoInput.description}
              rows={5}
              onChange={(e) =>
                setTodoInput({ ...todoInput, description: e.target.value })
              }
            />
            <TodoButton title="Add Todo" onClick={addNewTodo} />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default NewTodo