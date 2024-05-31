import { useState } from "react";
import StyledInput from "../../styledComponents/TodoInput";
import { Button } from "@mui/material";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div style={containerStyle}>
      <StyledInput
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <StyledInput
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <StyledInput
        placeholder=" Retype Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth
      />
      <Button variant="contained" color="primary" sx={{ paddingX: 10 }}>
        submit
      </Button>
    </div>
  );
};

const containerStyle = {
  // border: '1px solid white',
  display: "flex",
  flexDirection: "column",
  padding: "20px",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  flexGrow: 1,
  backgroundColor: "#7493A2",
  color: "white",
  gap: 10,
  // fontSize: '1.5rem',
  fontWeight: "bold",
  fontFamily: "Arial",
  fontStyle: "italic",
  letterSpacing: "2px",
  textShadow: "0px 0px 10px rgba(0,0,0,0.2)",
  boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
} as const;

export default SignUp;
