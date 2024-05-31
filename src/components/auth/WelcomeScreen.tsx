import { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import { Box, Button } from "@mui/material";

const WelcomeScreen = () => {
  const [newUser, setNewUser] = useState(false);
  return (
    <Box style={containerStyle}>
      <h2>Productivity tools that actually help you accomplish your goals!</h2>
      <h2>Sign in to get started!</h2>
      <Box style={{ flexGrow: 1, width: '89%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
        {
          !newUser && (
              <Box sx={{ marginY: 5 }}>
                <Login />
                <Box sx={{ mt: 4}}>
                  Don't have an account?
                  <Button onClick={() => setNewUser(true)}>
                    Sign up
                  </Button> 
                </Box>
              </Box>
            
          )
            }
        { newUser && (
          <Box sx={{ marginY: 5 }}>
            <SignUp />
            <Box sx={{ mt: 4 }}>
              Already have an account?
              <Button onClick={() => setNewUser(false)}>
                Log in
              </Button>
            </Box>
          </Box>
        )}
        {/* <Login /> */}
      </Box>
    </Box>
  )
}

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  width: '100%',
  height: '100%',
  backgroundColor: '#7493A2',
  color: 'white',
  borderBottomLeftRadius: '30px',
  // fontSize: '1.5rem',
  fontWeight: 'bold',
  fontFamily: 'Arial',
  fontStyle: 'italic',
  letterSpacing: '2px',
  textShadow: '0px 0px 10px rgba(0,0,0,0.2)',
  boxShadow: '0px 0px 10px rgba(0,0,0,0.2)',
} as const

export default WelcomeScreen