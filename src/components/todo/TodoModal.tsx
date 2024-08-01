import { useAppDispatch } from "../../hooks/useAppDispatch";
import { motion, AnimatePresence } from "framer-motion";
import { Todo } from "./interface";
import { FaWindowClose } from "react-icons/fa";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { updateTodo } from "../../redux/todoSlice";

const TodoModal = ({
  todo,
  modalOpen,
  handleModalClose,
}: {
  todo: Todo;
  modalOpen: boolean;
  handleModalClose: () => void;
}) => {
  const dispatch = useAppDispatch();

  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);
  const [newDescription, setNewDescription] = useState(todo.description);

  useEffect(() => {
    if (modalOpen) {
      setNewTitle(todo.title);
      setNewDescription(todo.description);
    }
  }, [modalOpen, todo.title, todo.description]);

  const handleUpdateTodo = () => {
    const updateTimeStamp = new Date().toString();
    if (newTitle || newDescription) {
      dispatch(
        updateTodo({
          ...todo,
          title: newTitle,
          description: newDescription,
          updatedAt: updateTimeStamp,
        })
      );
      setEditMode(false);
    }
  };

  const handleChange = (e: SelectChangeEvent) => {
    dispatch(
      updateTodo({
        ...todo,
        urgency: e.target.value,
        updatedAt: new Date().toString(),
      })
    );
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
    },
  };

  return (
    <AnimatePresence>
      {modalOpen && (
        <motion.div
          onClick={handleModalClose}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            overflowX: "hidden",
            overflowY: "hidden",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1,
          }}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            style={{
              display: "flex",
              position: "relative",
              flexDirection: "column",
              border: "1px solid black",
              borderRadius: "5px",
              maxWidth: "650px",
              margin: "2rem auto",
              backgroundColor: "white",
              padding: "10px",
              gap: 10,
            }}
            variants={modalVariants}
          >
            <div
              style={{
                display: "flex",
                borderBottom: "1px solid black",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.5rem",
              }}
            >
              <h2>
                {!editMode ? (
                  todo.title
                ) : (
                  <TextField
                    placeholder={todo.title}
                    value={newTitle}
                    fullWidth
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                )}
              </h2>
              <FaWindowClose
                onClick={handleModalClose}
                style={{ fontSize: "1.5rem", color: "#E06546" }}
              />
            </div>
            <div>
              <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
                <Box sx={{ gap: 1, display: 'flex', flexGrow: 3 }}>
                  <Typography variant="h5" color="black">
                    Project:
                  </Typography>
                  <Typography variant="h5" color="black" fontStyle={'italic'}>
                    {!todo.project ? 'No project assigned' : todo.project}
                  </Typography>
                </Box>
                <FormControl sx={{ mb: 5, width: 200 }}>
                  <InputLabel
                    sx={{ display: "flex", gap: 2, alignItems: "center" }}
                    variant="standard"
                    htmlFor="standard-adornment-amount"
                  >
                    <Typography variant="h4" color="black">
                      Urgency:
                    </Typography>
                    <Select
                      onChange={handleChange}
                      value={todo.urgency}
                    >
                      <MenuItem value={"urgent"}>Urgent</MenuItem>
                      <MenuItem value={"current"}>Current</MenuItem>
                      <MenuItem value={"back log"}>Back log</MenuItem>
                      <MenuItem value={"completed"}>Completed</MenuItem>
                    </Select>
                  </InputLabel>
                </FormControl>
              </Box>
              <Box sx={{ my: 2, border: '1px solid black', p: 1 }}>
                {!editMode ? (
                  todo.description
                ) : (
                  <TextField
                    multiline
                    rows={4}
                    fullWidth
                    placeholder={todo.description}
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                  />
                )}
              </Box>
            </div>
            <Box>
              <Button
                onClick={
                  editMode ? handleUpdateTodo : () => setEditMode(!editMode)
                }
              >
                {!editMode ? "Edit" : "Save"}
              </Button>
            </Box>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TodoModal;
