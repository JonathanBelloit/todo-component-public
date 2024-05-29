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
  borderBottom: '1px solid black',
  flexGrow: 1,
  padding: '0px 20px',
  // paddingLeft: 10,
  // paddingVertical: 20,
  display: 'flex',
  // flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
}
export default TodoHeader