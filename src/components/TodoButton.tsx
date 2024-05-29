import React from 'react'

const buttonStyle = {
  borderRadius: 15,
  cursor: 'pointer'
}
const TodoButton = ({ onClick, title }: { onClick: () => void, title: string }) => {
  return (
    <button style={buttonStyle} onClick={onClick}>{title}</button>
  )
}

export default TodoButton