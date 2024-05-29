import React from 'react'

const TodoHeader = () => {
  return (
    <div style={headerStyle}>
      <div style={{ display: 'flex', alignItems: 'center'}}>
        <h1 style={{ textAlign: 'center' }}>Todo List</h1>
      </div>
    </div>
  )
}

const headerStyle = {
  border: '1px solid black',
  flexGrow: 1,
  padding: 10,
  display: 'flex',
  // flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
}
export default TodoHeader