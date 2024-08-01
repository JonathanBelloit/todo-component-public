import { useState} from 'react'
import { addTodo } from '../../redux/todoSlice'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import TodoButton from './TodoButton';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { SelectChangeEvent } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import dayjs from 'dayjs';


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
    urgency: "current",
  });
  const dispatch = useAppDispatch();

  const addNewTodo = () => {
    const createdTimeStamp = new Date().toString();
    dispatch(addTodo({...todoInput, createdAt: createdTimeStamp, completed: false }));
    setTodoOpen(false);
    setTodoInput({
      title: "",
      description: "",
      urgency: "",
    });
  };

  const handleChange = (e: SelectChangeEvent) => {
    setTodoInput({ ...todoInput, urgency: e.target.value });
  }

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
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Box sx={{ width: '100%' }}>
              <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="standard-adornment-amount">
                  Urgency
                  <Select
                    onChange={handleChange}
                    value={todoInput.urgency}
                  >
                    <MenuItem value={'urgent'}>Urgent</MenuItem>
                    <MenuItem value={'current'}>Current</MenuItem>
                    <MenuItem value={'back log'}>Back log</MenuItem>
                  </Select>
                </InputLabel>
              </FormControl>
            </Box>
            <Box>
              <label>Due Date:</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker />
              </LocalizationProvider>
            </Box>
            <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
            <label>Enter Todo Description:</label>
            <textarea
              value={todoInput.description}
              rows={5}
              onChange={(e) =>
                setTodoInput({ ...todoInput, description: e.target.value })
              }
            />
            <TodoButton title="Add Todo" onClick={addNewTodo} />
            </Box>
            </Box>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default NewTodo;