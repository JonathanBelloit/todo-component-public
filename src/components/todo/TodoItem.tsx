import React from 'react'
import { Todo } from './interface'
import { Box, Typography } from '@mui/material'

const TodoItem = ({ todo }: { todo: Todo }) => {
  return (
    <Box>
      <Typography variant="h5">{todo.title}</Typography>
    </Box>
  )
}

export default TodoItem