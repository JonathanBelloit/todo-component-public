import React from 'react'
import { Todo } from './interface'
import { Box, Typography } from '@mui/material'
import { FaInfoCircle } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'

const TodoListItem = ({ todo, handleModalOpen, handleDeleteTodo }: { todo: Todo, handleModalOpen: (todo: Todo) => void, handleDeleteTodo: (id: string) => void }) => {
  return (
    <Box sx={todoItemStyle}>
      <Typography variant="h5" sx={{ fontWeight: '700' }}>{todo.title}</Typography>
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <FaInfoCircle
          color="#DBC53A"
          fontSize="1em"
          onClick={() => handleModalOpen(todo)}
        />
        <MdDelete
          color="#E06546"
          fontSize="1.5em"
          onClick={() => handleDeleteTodo(todo.id ?? "")}
        />
      </Box>
    </Box>
  )
}

const todoItemStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1rem .5rem",
  marginBottom: "0.5rem",
  borderRadius: "5px",
  backgroundColor: "#fff",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  transition: "background-color 0.3s",
  transform: "scale(1)",
  "&:hover": {
    backgroundColor: "#f1f1f1",
    transform: "scale(1.05)",
  }
};

export default TodoListItem