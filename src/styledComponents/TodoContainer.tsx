import { styled, Paper } from "@mui/material"

const StyledContainer = styled(Paper)`
  border: 1px solid black;
`;

const TodoContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <StyledContainer>{children}</StyledContainer>;
};

export default TodoContainer