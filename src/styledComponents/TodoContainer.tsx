import { styled, Paper } from "@mui/material"

const StyledContainer = styled(Paper)`
  border: 2px solid #ddd;
  width: 500px;
  border-radius: 30px;
`;

const TodoContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <StyledContainer>{children}</StyledContainer>;
};

export default TodoContainer