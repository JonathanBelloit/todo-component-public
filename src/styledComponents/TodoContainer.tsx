import { styled, Paper } from "@mui/material"

const StyledContainer = styled(Paper)`
  border: 2px solid black;
  width: 500px;
  border-radius: 10px;
`;

const TodoContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <StyledContainer>{children}</StyledContainer>;
};

export default TodoContainer