import { PiSignOut } from "react-icons/pi";
import { signOut, auth } from '../../config/firebase'

const TodoHeader = () => {
  return (
    <div style={headerStyle}>
      <h1 style={{ textAlign: 'center' }}>Todo List</h1>
      <PiSignOut style={{ cursor: 'pointer', fontSize: '2.5rem' }} onClick={() => signOut(auth)} />
    </div>
  )
}

const headerStyle = {
  borderBottom: '1px solid black',
  borderTopRightRadius: '30px',
  flexGrow: 1,
  padding: '0px 20px',
  // paddingLeft: 10,
  // paddingVertical: 20,
  display: 'flex',
  // flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#5C7480',
  color: 'white',
  fontStyle: 'italic'
}
export default TodoHeader